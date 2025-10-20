// 1. Dữ liệu của 5 người bạn muốn chúc mừng (ĐÃ CẬP NHẬT)
const recipients = [
    {
        name: "Chị Nhi",
        message: "Chúc chị 20/10 vui vẻ, ngày càng xinh đẹp và thành công hơn nữa nha!",
        image: "./image/chi_nhi.jpg", 
        color: "bg-pink-100 border-pink-400" 
    },
    {
        name: "Chị Hân", 
        message: "Chúc chị 20/10 thật hạnh phúc, rạng rỡ, và đạt được mọi điều mình mong muốn!",
        image: "./image/Han.jpg", 
        color: "bg-red-100 border-red-400" 
    },
    {
        name: "Chang",
        message: "20/10 vui vẻ nhé ! Luôn mạnh mẽ, tự tin và tỏa sáng theo cách riêng của mình!",
        image: "./image/chang.jpg", 
        color: "bg-yellow-100 border-yellow-400" 
    },

];

// Hàm tạo các thẻ chúc mừng trong HTML 
function createCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = recipients.map((person, index) => `
        <div id="card-${index}" class="personalized-card flex flex-col items-center p-4 rounded-2xl shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border-4 ${person.color} opacity-0 scale-90">
            <div class="w-32 h-32 bg-white rounded-full border-4 border-${person.color.split('-')[2]}-300 flex items-center justify-center text-sm text-gray-500 mb-3 overflow-hidden">
                <img class="w-full h-full object-cover" src="${person.image}" alt="Ảnh của ${person.name}">
            </div>
            
            <h3 class="text-2xl font-bold text-pink-700 mb-1 text-center">${person.name}</h3>
            <p class="text-base text-gray-600 italic text-center leading-snug">"${person.message}"</p>
        </div>
    `).join('');
}
createCards();


// Biến cờ kiểm tra lần tương tác đầu tiên
let isFirstInteraction = true; 

// 2. Hoạt ảnh chào mừng khi tải trang (CHỈ HIỂN THỊ NÚT SURPRISE)
const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

tl.from("#main-greeting", { y: -50, opacity: 0, scale: 0.8, duration: 1.2 })
  .to("#date-text", { opacity: 1, scale: 1.1, duration: 0.8 }, "-=0.5")
  .to("#date-text", { scale: 1, duration: 0.3 }) 
  .to("#message-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
  .from("#surpriseBtn", { y: 20, opacity: 0, scale: 0.9, duration: 0.6 }, "-=0.3"); 


// 3. Chức năng tạo trái tim và lấp lánh khi nhấp chuột (Giữ nguyên)
document.addEventListener('click', (e) => {
    // Đã loại bỏ kiểm tra modal secret
    createFloatingElement(e.clientX, e.clientY, '✨', 1.5, 30);
    if (Math.random() < 0.3) {
        createFloatingElement(e.clientX, e.clientY, '💖', 1, 50);
    }
});

function createFloatingElement(x, y, content, scale = 1, yRange = 80) {
    const el = document.createElement('div');
    el.className = 'floating-element text-xl md:text-2xl'; 
    el.innerHTML = content;
    el.style.left = `${x - 10}px`; 
    el.style.top = `${y - 10}px`; 
    document.body.appendChild(el);

    gsap.to(el, {
        y: `-=${yRange}`, 
        x: (Math.random() - 0.5) * 50, 
        opacity: 0,
        scale: scale,
        rotation: (Math.random() - 0.5) * 45, 
        duration: 2.5,
        ease: "power1.out",
        onComplete: () => el.remove() 
    });
    gsap.fromTo(el, { opacity: 0, scale: 0.1 }, { opacity: 1, scale: scale, duration: 0.3 });
}


// 4. Hoạt ảnh Bất Ngờ khi nhấn nút CHUNG (ẨN NÚT SURPRISE và HIỂN THỊ THẺ)
document.getElementById('surpriseBtn').addEventListener('click', () => {
    const btnSurprise = document.getElementById('surpriseBtn');
    const music = document.getElementById('background-music');
    
    if (btnSurprise.classList.contains('animating')) return;
    btnSurprise.classList.add('animating');
    
    // Logic: Nếu là tương tác đầu tiên, bật tiếng nhạc (unmute)
    if (isFirstInteraction) {
        music.muted = false; // Bỏ chế độ câm
        music.play().catch(e => console.log("Lỗi khi phát nhạc: ", e)); // Phát (nếu chưa chạy)
        isFirstInteraction = false;
    }

    gsap.to(btnSurprise, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });

    // Confetti
    const rect = btnSurprise.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const elements = ['💖', '🌟', '🌸', '✨', '🎀']; 
    const count = 35; 

    for (let i = 0; i < count; i++) {
        const content = elements[Math.floor(Math.random() * elements.length)];
        const el = document.createElement('div');
        el.className = 'floating-element text-2xl md:text-3xl';
        el.innerHTML = content;
        el.style.left = `${centerX}px`;
        el.style.top = `${centerY}px`;
        document.body.appendChild(el);

        gsap.to(el, {
            x: (Math.random() - 0.5) * 600, 
            y: (Math.random() - 1) * 400, 
            rotation: Math.random() * 720,
            opacity: 0,
            scale: Math.random() * 1.5 + 0.5,
            duration: Math.random() * 3 + 1.5,
            ease: "power2.out",
            onComplete: () => el.remove()
        });
        gsap.fromTo(el, { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 0.2 });
    }
    
    // Tiết lộ 5 thẻ (chỉ chạy một lần)
    const surpriseTimeline = gsap.timeline({ 
        defaults: { ease: "back.out(1.7)" },
        onComplete: () => btnSurprise.classList.remove('animating') 
    });
    
    // Nếu khu vực thẻ đã hiển thị, chỉ chạy confetti và hiệu ứng pop button
    if (document.getElementById('personalized-cards').classList.contains('is-visible')) {
        return; 
    }
    
    surpriseTimeline
        // Ẩn nút Surprise
        .to(btnSurprise, { opacity: 0, scale: 0.5, duration: 0.5 }, 0.5)
        .call(() => {
            btnSurprise.style.display = 'none'; // Ẩn hoàn toàn nút Surprise
            // Không có nút Secret
        }, null, 0.9)
        
        // Căn giữa lại button-container (nếu cần)
        .to("#button-container", { justifyContent: 'center', duration: 0.5 }, 1)
        
        // Hiện tiêu đề và thẻ
        .call(() => {
            document.getElementById('card-heading').classList.remove('hidden'); 
            document.getElementById('personalized-cards').classList.add('is-visible'); 
        }, null, 1) // Bắt đầu tại 1s
        .fromTo("#card-heading", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2) // Tiêu đề hiện
        
        // Khu vực thẻ chúc mừng hiện
        .to("#personalized-cards", { opacity: 1, y: 0, duration: 0.8 }, 1.2)
        
        // Hoạt ảnh từng thẻ 
        .fromTo(".personalized-card", { opacity: 0, scale: 0.5, y: 50 }, { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "elastic.out(1, 0.5)" 
        }, 1.4); 
});

// Logic cho Modal Secret Message ĐÃ BỊ LOẠI BỎ