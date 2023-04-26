const cards = document.querySelectorAll(".card")
// callback 수신 
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if (entry.isIntersecting) observer.unobserve(entry.target)
    })
    // 임계값
}, {
    threshold: 1,
});
// 교차점 관찰자
const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0]
    // 마지막 카드가 보이면 => 새로운 카드 로드
    if (!lastCard.isIntersecting) return
    loadNewCards()
    // 마지막 카드를 관찰하지 않도록 
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(document.querySelector(".card:last-child"))
}, {
    rootMargin: "100px", 
});
lastCardObserver.observe(document.querySelector(".card:last-child"))

cards.forEach(card => {
    observer.observe(card)
});
const cardContainer = document.querySelector(".card-container")
function loadNewCards() {
    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div")
        card.textContent = "New Card"
        card.classList.add("card")
        observer.observe(card)
        cardContainer.append(card)
    }
};