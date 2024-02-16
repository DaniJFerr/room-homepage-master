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

    function clearContent() {
        contentContainer.empty();
    }

    function displayContent(index) {
            clearContent();
            if (index in textContent) {
            const newContent = generateContentHtml(textContent[index], index);
            contentContainer.append(newContent);
        }
    }

    function changeContent(step) {
        currentIndex = (currentIndex + step + textContent.length) % textContent.length;
        displayContent(currentIndex);
    }

    function changeImage(step) {
        currentIndex = (currentIndex + step + imageData.length) % imageData.length;
        displayImage(currentIndex);
    }

    
    $(document).on("click", ".button-select", function(event) {
        const direction = $(event.target).closest('button').hasClass('icon-angle-left') ? -1 : 1;
        changeImage(direction);
        changeContent(direction);
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
            $(window).on('resize',function(){
                createGallery(imageData);
            });  
            displayContent(currentIndex); // Display initial content
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}
