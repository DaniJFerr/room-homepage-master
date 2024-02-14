
import GalleryData from "../../data/data.json";
import $ from "jquery";

const galleryContainer = $(".hero-image");
const contentContainer = $(".shop-content");
let currentIndex = 0;
let imageData = [];
let textContent = [];

export default function Gallery() {
    function createGallery(data) {
        data.forEach((item, index) => {
            let imgElement = $('<img>')
                .attr('src', item.image)
                .attr("data-index", index);
            galleryContainer.append(imgElement);
        });
        displayImage(currentIndex);
    }

    function displayImage(index) {
        let images = galleryContainer.find('img');
        if (images.length > 0 && images[index]) {
            images.hide().eq(index).show(); // Hide all images, then show the selected one
        }
    }

    function clearContent() {
        contentContainer.empty();
    }

    function displayContent(index) {
        if (textContent.length > 0 && textContent[index]) {
            clearContent();
            const item = textContent[index];
            const newContent = generateContentHtml(item, index);
            contentContainer.append(newContent);
        }
    }

    function changeContent(step) {
        const lastIndex = textContent.length - 1;
        currentIndex = (currentIndex + step + textContent.length) % textContent.length;
        displayContent(currentIndex);
    }

    function changeImage(step) {
        const lastIndex = imageData.length - 1;
        currentIndex = (currentIndex + step + imageData.length) % imageData.length;
        displayImage(currentIndex);
    }

    $(document).on("click", ".icon-angle-left",() => {
        changeImage(-1);
        changeContent(-1);
    });

    $(document).on("click",".icon-angle-right", () => {
        changeImage(1);
        changeContent(1);
    });

    async function fetchData() {
        try {
            const response = await fetch(GalleryData);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            imageData = data.data.map(item => ({
                image: item.image
            }));
            textContent = data.data.map(item => ({
                title: item.title,
                content: item.content,
                icons: item.icons
            }));
            createGallery(imageData);
            displayContent(currentIndex); // Display initial content
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}

function generateContentHtml(item, index) {
    return $(`<div class="text-content">
                    <h1 id="shopTitle-${index}" class="shop-title">${item.title}</h1>
                    <p class="p-shop-content">
                        ${item.content}
                    </p>
                    <div class="shop-button">
                        <button class="div-8" aria-label="Shop now">SHOP NOW</button>
                        <button class="button-arrow-img" aria-label="Arrow pointing right">
                            <img src="../../assets/icon-arrow.svg" loading="lazy"/>
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
