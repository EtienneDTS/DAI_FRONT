export const carousel = (carouselClass, btnClass, scrollStep, maxScroll) => {
    const wrapper = document.createElement("div");
    wrapper.className = `carousel ${carouselClass}`;
    wrapper.innerHTML = `
      <button class="carousel-btn left ${btnClass}">‹</button>
      <div class="carousel-track ${carouselClass}"></div>
      <button class="carousel-btn right ${btnClass}">›</button>
    `;

    const track = wrapper.querySelector(`.${carouselClass}`);
    const btnLeft = wrapper.querySelector(`.${btnClass}.left`);
    const btnRight = wrapper.querySelector(`.${btnClass}.right`);

    let scrollAmount = 0;

    btnLeft.addEventListener("click", () => {
        console.log("click");
        scrollAmount = Math.max(0, scrollAmount - scrollStep);
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    btnRight.addEventListener("click", () => {
    scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll - scrollStep);
    track.style.transform = `translateX(-${scrollAmount}px)`;
    });


    return wrapper;
};
