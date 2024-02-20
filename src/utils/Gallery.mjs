import GalleryData from "../../data/data.json";
import 'animate.css';
import $ from "jquery";

const galleryContainer = $(".hero-image");
const contentContainer = $(".shop-content");
let currentIndex = 0;
let imageData = [];
let textContent = [];

export default function Gallery() {

    function createGallery(data) {
        galleryContainer.empty();
        data.forEach((item, index) => {
             let imgElement = $('<img>')
            .addClass('animate__animated','animate__flipInY')
            .attr('src', window.innerWidth > 900 ? item.image : item.mobile)
            .attr("data-index", index);
            galleryContainer.append(imgElement);
            });
            displayImage(currentIndex);
        }
        
    function displayImage(index) {
        let images = galleryContainer.find('img');
            images.hide().eq(index).show(); 
    }
    
function generateContentHtml(item, index) {
    return $(`
            <div class="shop"> 
                <div class="text-content">
                     <h1 id="shopTitle-${index}" class="shop-title">${item.title}</h1>
                     <p class="p-shop-content">
                         ${item.content}
                     </p>
                </div>
            <div class="shop-button">
                    <button class="button-arrow-img" aria-label="Arrow pointing right">SHOP NOW<img src="../../assets/icon-arrow.svg" loading="lazy"/>
                    </button>
                </div>
            </div>
            <div class="button-select">
                <button class="icon-angle-left" aria-label="Previous item">
                    <img src="../../assets/icon-angle-left.svg"  loading="lazy"/>
                </button>
                <button class="icon-angle-right" aria-label="Next item">
                    <img src="../../assets/icon-angle-right.svg"  loading="lazy"/>
                </button>
            </div>`);
}


    function displayContent(index) {
        contentContainer.empty();
            if (index in textContent) {
            const newContent = generateContentHtml(textContent[index], index);
            contentContainer.append(newContent);
        }
    }

    function changeGallery(step) {
        currentIndex = (currentIndex + step + textContent.length) % textContent.length;
        displayImage(currentIndex);
        displayContent(currentIndex);
    }
    
    $(document).on("click", ".icon-angle-left, .icon-angle-right", function(event) {
        const direction = $(this).hasClass('icon-angle-left') ? -1 : 1;
        changeGallery(direction);
    });

    async function fetchData() {
        try {
            const response = await fetch(GalleryData);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            imageData = data.data.map(item => ({
                mobile: item.mobile,
                image: item.image
            }));
            textContent = data.data.map(item => ({
                title: item.title,
                content: item.content,
                icons: item.icons
            }));
            createGallery(imageData);
            displayContent(currentIndex);
            $(window).on('resize',function(){
                createGallery(imageData);
            });  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}
