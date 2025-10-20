// 1. Dữ liệu của 5 người bạn muốn chúc mừng (KHÔNG ĐỔI)
const recipients = [
    {
        name: "Chị nhi", 
        message: "Chúc chị yêu ngày 20/10 thật rạng rỡ và hạnh phúc. Mong chị luôn được yêu thương, cười thật nhiều và gặp toàn điều may mắn! 🌸",
        image: "./image/chi_nhi.jpg", 
        color: "bg-red-100 border-red-400" 
    },
    {
        name: "Chang",
        message: "20/10 vui vẻ nha bạn thân! Chúc mày luôn rạng rỡ, tươi tắn như đóa hoa đầu mùa và gặp nhiều điều tốt lành nhất 💞",
        image: "./image/chang.jpg", 
        color: "bg-yellow-100 border-yellow-400" 
    },
    {
        name: "Chị Hân",
        message: "Nhân ngày Phụ nữ Việt Nam 20/10, chúc chị luôn mạnh mẽ, thành công và giữ mãi nét dịu dàng của người phụ nữ Việt! 💐",
        image: "./image/Han.jpg", 
        color: "bg-purple-100 border-purple-400" 
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
            
            <h3 class="text-2xl font-bold text-pink-700 mb-1 text-center">${person.name.split(' ').slice(-2).join(' ')}</h3>
            <p class="text-base text-gray-600 italic text-center leading-snug">"${person.message}"</p>
        </div>
    `).join('');
}
createCards();


// Biến cờ kiểm tra lần tương tác đầu tiên (MỚI)
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
    if (document.getElementById('secretModal').style.display === 'flex') return;
    
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


// 4. Hoạt ảnh Bất Ngờ khi nhấn nút CHUNG (ẨN NÚT SURPRISE VÀ ĐƯA NÚT SECRET VÀO GIỮA)
document.getElementById('surpriseBtn').addEventListener('click', () => {
    const btnSurprise = document.getElementById('surpriseBtn');
    const btnSecret = document.getElementById('secretBtn');
    const music = document.getElementById('background-music'); // Lấy phần tử audio (MỚI)
    
    if (btnSurprise.classList.contains('animating')) return;
    btnSurprise.classList.add('animating');
    
    // Logic: Nếu là tương tác đầu tiên, bật tiếng nhạc (unmute) (MỚI)
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
    
    // Tiết lộ nút Secret và 5 thẻ (chỉ chạy một lần)
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
            btnSecret.classList.remove('hidden'); // Hiện nút Secret
        }, null, 0.9)
        
        // Đưa nút Secret vào giữa (thay thế vị trí)
        .fromTo(btnSecret, 
            { opacity: 0, x: 0 }, 
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 
            1)
        .to("#button-container", { justifyContent: 'center', duration: 0.5 }, 1) // Căn giữa container
        
        // Hiện tiêu đề và thẻ (ĐỒNG THỜI với hoạt ảnh nút Secret)
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


// 5. Logic cho Modal Secret Message (ĐÃ CẬP NHẬT: Thêm ảnh & Mã QR)

const secretModal = document.getElementById('secretModal');
const modalContent = document.getElementById('modalContent');
const submitNameBtn = document.getElementById('submitName');
const nameInput = document.getElementById('nameInput');
const messageSection = document.getElementById('messageSection');
const inputSection = document.getElementById('inputSection');


// Lấy URL ảnh từ recipients
const getRecipientData = (name) => {
    return recipients.find(r => r.name === name);
};


// Dữ liệu tên bí mật, lời chúc và URL Mã QR
// NOTE: THAY THẾ 'URL_QR_CODE' BẰNG URL MÃ QR THẬT CỦA BẠN CHO MỖI NGƯỜI
const secretData = {
    // Tên bí mật phải viết hoa để kiểm tra khớp
    "NHI": {
        name: "Chị Nhi",
        message: "Nhân ngày Phụ nữ Việt Nam 20/10, chúc chị luôn mạnh mẽ, thành công và giữ mãi nét dịu dàng của người phụ nữ Việt! 💐",
        color: "text-green-600",
        image: getRecipientData("Chị Nhi")?.image,
        qr_code: "./image/ma_qr1.png" // Dùng đường dẫn giả định, bạn cần thay bằng file QR thật
    },
    "CHANG": {
        name: "Chang",
        message: "Chúc mày 20/10 siêu xinh, siêu vui, và được “bao quà” nhé 😎💝",
        color: "text-purple-600",
        image: getRecipientData("Chang")?.image,
        qr_code: "./image/ma_qr1.png" // Dùng đường dẫn giả định, bạn cần thay bằng file QR thật
    },
    "HÂN": {
        name: "Chị Hân",
        message: "Chúc chị yêu ngày 20/10 thật rạng rỡ và hạnh phúc. Mong chị luôn được yêu thương, cười thật nhiều và gặp toàn điều may mắn! 🌸",
        color: "text-yellow-600",
        image: getRecipientData("Chị Hân")?.image,
        qr_code: "./image/ma_qr1.png" // Dùng đường dẫn giả định, bạn cần thay bằng file QR thật
    },
};

// Hàm mở Modal (Giữ nguyên)
document.getElementById('secretBtn').addEventListener('click', () => {
    // Reset modal về trạng thái nhập tên
    nameInput.value = '';
    inputSection.classList.remove('hidden');
    messageSection.classList.add('hidden');
    document.getElementById('modalTitle').innerText = "Si cờ rịc cho nàng nè ";
    
    secretModal.style.display = 'flex';
    gsap.fromTo(modalContent, 
        { scale: 0.8, opacity: 0, y: -50 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
    );
});

// Hàm đóng Modal (Giữ nguyên)
function closeModal() {
    gsap.to(modalContent, { 
        scale: 0.8, 
        opacity: 0, 
        y: 50, 
        duration: 0.3, 
        onComplete: () => {
            secretModal.style.display = 'none';
        }
    });
}
document.getElementById('closeModal').addEventListener('click', closeModal);
secretModal.addEventListener('click', (e) => {
    if (e.target === secretModal) {
        closeModal();
    }
});


// Hàm Xử lý khi nhập tên (CẬP NHẬT LOGIC: Chèn ảnh và QR Code)
submitNameBtn.addEventListener('click', () => {
    const rawName = nameInput.value.trim();
    const normalizedName = rawName.toUpperCase(); // Chuẩn hóa để so sánh
    const personalizedData = secretData[normalizedName];
    
    let personalizedGreeting;

    if (personalizedData) {
        // Tên khớp: Hiển thị lời chúc cá nhân + Ảnh + Mã QR
        const imageHtml = personalizedData.image ? 
                          `<img src="${personalizedData.image}" alt="Ảnh bí mật" class="w-32 h-32 object-cover rounded-full border-4 border-pink-400 shadow-lg mx-auto mb-4">` : 
                          '';
        
        const qrHtml = personalizedData.qr_code ? 
                       `<div class="mt-6 p-4 border-2 border-pink-300 rounded-lg">
                            <p class="text-lg font-bold text-pink-700 mb-3">Quét đi có điều bất ngờ!</p>
                            <img src="${personalizedData.qr_code}" alt="Mã QR" class="w-40 h-40 object-contain mx-auto border border-gray-200 p-1">
                        </div>` : 
                       '';


        personalizedGreeting = `
            <div class="space-y-4">
                ${imageHtml}
                <h3 class="text-3xl font-extrabold ${personalizedData.color} font-['Pacifico']">Hí ${personalizedData.name}!</h3>
                <p class="text-xl text-gray-800 leading-relaxed">${personalizedData.message}</p>
                ${qrHtml}
                <p class="text-sm italic text-pink-400 pt-2">Chúc 20/10 thật hạnh phúc!</p>
            </div>
        `;
        document.getElementById('modalTitle').innerText = "🎁 Síc cờ rịt của các nàng";
    } else {
        // Tên không khớp: Hiển thị thông báo lỗi/thử lại
        personalizedGreeting = `
            <div class="space-y-4">
                <h3 class="text-3xl font-extrabold text-gray-500 font-['Pacifico']">Oops!</h3>
                <p class="text-xl text-red-500 leading-relaxed">Sai tên nha người đẹp</p>
                <p class="text-base text-gray-700">Kiểm tra lại đi tên của bặn á😉)</p>
            </div>
        `;
        document.getElementById('modalTitle').innerText = "Thử Lại Nhé!";
    }

    // Hiển thị kết quả
    messageSection.innerHTML = personalizedGreeting;
    inputSection.classList.add('hidden');
    messageSection.classList.remove('hidden');

    // Tạo hiệu ứng bất ngờ và confetti nhỏ trong modal (chỉ khi nhập đúng)
    if (personalizedData) {
        for (let i = 0; i < 15; i++) {
            const x = modalContent.offsetLeft + (Math.random() * modalContent.offsetWidth);
            const y = modalContent.offsetTop + modalContent.offsetHeight;
            createFloatingElement(x, y, '🎉', 1.2, 100); 
        }
    }
    
    // Hoạt ảnh "pop" cho lời chúc
    gsap.from(messageSection, { opacity: 0, scale: 0.9, y: 20, duration: 0.6, ease: "power3.out" });
});