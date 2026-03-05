
// بيانات الصور لكل فئة - 10 صور لكل فئة
const categoryImages = {
    'reception': [
        'images/reception1.jpg',
        'images/reception2.jpg',
        'images/reception3.jpg',
        'images/reception4.jpg',
        'images/reception5.jpg',
        'images/reception6.jpg',
        'images/reception7.jpg',
        'images/reception8.jpg',
        'images/reception9.jpg',
        'images/reception10.jpg',
        'images/reception11.jpg',
        'images/reception12.jpg',
        'images/reception13.jpg',
        'images/reception14.jpg',
        'images/reception15.jpg',
        'images/reception16.jpg',
        'images/reception17.jpg',
        'images/reception18.jpg',
        'images/reception19.jpg',
        'images/reception20.jpg',
        'images/reception21.jpg',
        'images/reception22.jpg',
        'images/reception23.jpg',
        'images/reception24.jpg'
    ],
     'fela-k': [
        'images/fela1.jpg',
        'images/fela2.jpg',
        'images/fela3.jpg',
        'images/fela4.jpg',
        'images/fela5.jpg',
        'images/fela6.jpg',
        'images/fela7.jpg',
        'images/fela8.jpg',
        'images/fela9.jpg',
        'images/fela10.jpg'
    ],
     'fela_3': [
        'images/Screenshot1.jpg',
        'images/Screenshot2.jpg',
        'images/Screenshot3.jpg',
        'images/Screenshot4.jpg',
        'images/Screenshot5.jpg',
        'images/Screenshot6.jpg',
        'images/Screenshot7.jpg',
        'images/Screenshot8.jpg',
        'images/Screenshot9.jpg',
        'images/Screenshot10.jpg',
        'images/Screenshot11.jpg',
        'images/Screenshot12.jpg',
        'images/Screenshot13.jpg',
        'images/Screenshot14.jpg',
        'images/Screenshot15.jpg',
        'images/Screenshot16.jpg',
        'images/Screenshot17.jpg',
        'images/Screenshot18.jpg',
        'images/Screenshot19.jpg'
    ],

'garden': [
        'images/garden1.jpg',
        'images/garden2.jpg',
        'images/garden3.jpg',
        'images/garden4.jpg',
        'images/garden5.jpg',
        'images/garden6.jpg',
        'images/garden7.jpg',
        'images/garden8.jpg',
        'images/garden9.jpg',
        'images/garden10.jpg',
        'images/garden11.jpg'
    ],

    'master-bedroom': [
        'images/master1.jpg',
        'images/master2.jpg',
        'images/master3.jpg',
        'images/master4.jpg',
        'images/master5.jpg',
        'images/master6.jpg',
        'images/master7.jpg',
        'images/master8.jpg',
        'images/master9.jpg',
        'images/master10.jpg',
        'images/master11.jpg',
        'images/master12.jpg',
        'images/master13.jpg',
        'images/master14.jpg',
        'images/master15.jpg',
        'images/master16.jpg',
        'images/master17.jpg',
        'images/master18.jpg',
        'images/master19.jpg',
        'images/master20.jpg'
    ],
    'boys-room': [
        'images/boy1.jpg',
        'images/boy2.jpg',
        'images/boy3.jpg',
        'images/boy4.jpg',
        'images/boy5.jpg',
        'images/boy6.jpg',
        'images/boy7.jpg',
        'images/boy8.jpg',
        'images/boy9.jpg',
        'images/boy10.jpg'
    ],
    'girls-room': [
        'images/girl1.jpg',
        'images/girl2.jpg',
        'images/girl3.jpg',
        'images/girl4.jpg',
        'images/girl5.jpg',
        'images/girl6.jpg',
        'images/girl7.jpg'
    ],
    'small-bathroom': [
        'images/small1.jpg',
        'images/small2.jpg',
        'images/small3.jpg',
        'images/small4.jpg',
        'images/small5.jpg',
        'images/small6.jpg',
        'images/small7.jpg',
        'images/small8.jpg',
        'images/small9.jpg'
    ],
    'large-bathroom': [
        'images/big1.jpg',
        'images/big2.jpg',
        'images/big3.jpg',
        'images/big4.jpg',
        'images/big5.jpg', 
        'images/big6.jpg',
        'images/big7.jpg',
        'images/big8.jpg',
        'images/big9.jpg',
        'images/big10.jpg',
        'images/big11.jpg'
    ],
    'kitchen': [
        'images/kichin1.jpg',
        'images/kichin2.jpg',
        'images/kichin3.jpg',
        'images/kichin4.jpg',
        'images/kichin5.jpg',
        'images/kichin6.jpg',
        'images/kichin7.jpg',
        'images/kichin8.jpg',
        'images/kichin9.jpg',
        'images/kichin10.jpg',
        'images/kichin11.jpg',
        'images/kichin12.jpg',
        'images/kichin13.jpg',
        'images/kichin14.jpg',
        'images/kichin15.jpg',
        'images/kichin16.jpg',
        'images/kichin17.jpg'
    ]
};

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ==================== Form Validation ====================
const formValidation = {
    name: (value) => {
        if (!value) return "اسم العميل مطلوب";
        if (value.length < 3) return "يجب أن يكون الاسم 3 أحرف على الأقل";
        return null;
    },
    phone: (value) => {
        if (!value) return "رقم الهاتف مطلوب";
        if (!/^[0-9\s\-\+\(\)]{10,}$/.test(value)) return "رقم الهاتف غير صحيح";
        return null;
    },
    location: (value) => !value ? "نوع المكان مطلوب" : null,
    area: (value) => !value ? "المنطقة مطلوبة" : null,
    floor: (value) => !value ? "الدور مطلوب" : null,
    apartment: (value) => !value ? "حالة الشقة مطلوبة" : null,
    designType: (value) => !value ? "نوع التصميم مطلوب" : null,
    'floor-type': (value) => !value ? "نوع الأرضيات مطلوب" : null,
    'designs-available': (value) => !value ? "هذا الحقل مطلوب" : null,
    electricity: (value) => !value ? "نظام الكهرباء مطلوب" : null,
    plumbing: (value) => !value ? "نظام السباكة مطلوب" : null,
    'customer-location': (value) => !value ? "مكان إقامة العميل مطلوب" : null,
};

// ==================== Toast Notification ====================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(toast);

    // Add animation
    const style = document.createElement('style');
    if (!document.getElementById('toast-styles')) {
        style.id = 'toast-styles';
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 24px;
                left: 24px;
                padding: 16px 24px;
                border-radius: 8px;
                color: white;
                z-index: 50;
                animation: slideIn 0.3s ease-out;
                display: flex;
                align-items: center;
                gap: 12px;
                max-width: 400px;
            }
            
            .toast-success {
                background: linear-gradient(135deg, #d4af37 0%, #fdb813 100%);
            }
            
            .toast-error {
                background: #dc2626;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast-icon {
                font-size: 20px;
                font-weight: bold;
            }
            
            .toast-notification p {
                margin: 0;
                font-weight: 600;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== Form Error Display ====================
function showFieldError(fieldName, errorMessage) {
    const field = document.querySelector(`#${fieldName}`);
    if (!field) return;

    const parent = field.closest('.form-group');
    if (!parent) return;

    // Remove existing error message
    const existingError = parent.querySelector('.form-error');
    if (existingError) existingError.remove();

    // Add new error message
    if (errorMessage) {
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = errorMessage;
        parent.appendChild(errorEl);

        // Add error styling to input
        field.style.borderColor = '#dc2626';
        field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    } else {
        // Remove error styling
        field.style.borderColor = 'var(--border)';
        field.style.boxShadow = '';
    }
}

// ==================== Form Validation On Change ====================
function setupFieldValidation() {
    const formFields = document.querySelectorAll('.form-group input, .form-group select');
    
    formFields.forEach(field => {
        field.addEventListener('change', function() {
            const fieldName = this.id;
            const fieldValue = this.value;
            
            if (formValidation[fieldName]) {
                const error = formValidation[fieldName](fieldValue);
                showFieldError(fieldName, error);
            }
        });

        field.addEventListener('blur', function() {
            const fieldName = this.id;
            const fieldValue = this.value;
            
            if (formValidation[fieldName]) {
                const error = formValidation[fieldName](fieldValue);
                if (error) {
                    showFieldError(fieldName, error);
                }
            }
        });
    });
}

// ==================== Display Category Images ====================
function displayCategoryImages(category) {
    const gallery = document.getElementById('categoryGallery');
    gallery.innerHTML = '';

    const images = categoryImages[category] || [];

    images.forEach((imagePath, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="gallery-image-wrapper">
                <img src="${imagePath}" alt="صورة ${index + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <button class="gallery-btn" onclick="openImage('${imagePath}')">🔍 عرض</button>
                </div>
            </div>
        `;
        gallery.appendChild(item);
    });
}

// ==================== Open Image Modal ====================
function openImage(imagePath) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imagePath}" alt="صورة مكبرة">
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.remove();
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ==================== WhatsApp Form Integration ====================
document.getElementById('surveyForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        clientName: document.getElementById('name').value,
        phoneNumber: document.getElementById('phone').value,
        locationType: document.getElementById('location').value,
        area: document.getElementById('area').value,
        floor: document.getElementById('floor').value,
        apartmentState: document.getElementById('apartment').value,
        designType: document.getElementById('designType').value,
        flooring: document.getElementById('floor-type').value,
        designsAvailable: document.getElementById('designs-available').value,
        electricity: document.getElementById('electricity').value,
        plumbing: document.getElementById('plumbing').value,
        clientLocation: document.getElementById('customer-location').value
    };

    // Validate all fields
    let hasErrors = false;
    const fieldIds = ['name', 'phone', 'location', 'area', 'floor', 'apartment', 'designType', 'floor-type', 'designs-available', 'electricity', 'plumbing', 'customer-location'];
    
    fieldIds.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const fieldValue = field.value;
        if (formValidation[fieldId]) {
            const error = formValidation[fieldId](fieldValue);
            if (error) {
                showFieldError(fieldId, error);
                hasErrors = true;
            } else {
                showFieldError(fieldId, null);
            }
        }
    });

    if (hasErrors) {
        showToast('يرجى تصحيح الأخطاء المشار إليها', 'error');
        return;
    }

    // Build the message
    const message = `*طلب تسعير / تشطيب جديد* 🏗️✨

👤 *الاسم:* ${formData.clientName}
📱 *رقم الهاتف:* ${formData.phoneNumber}
🏢 *المكان:* ${formData.locationType}
🗺️ *المنطقة:* ${formData.area}
🔢 *الدور:* ${formData.floor}
🏠 *حالة الشقة:* ${formData.apartmentState}
🎨 *نوع التصميم:* ${formData.designType}
⬜ *الأرضية:* ${formData.flooring}
📋 *التصميمات المتاحة:* ${formData.designsAvailable}
⚡ *الكهرباء:* ${formData.electricity}
💧 *السباكة:* ${formData.plumbing}
🌍 *مكان الإقامة:* ${formData.clientLocation}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/201121322202?text=${encodedMessage}`;
    
    setSubmitLoading(true);
    showToast('تم استلام طلبك بنجاح! جاري تحويلك إلى واتساب...', 'success');

    // Small delay to show toast
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        setSubmitLoading(false);
        resetForm();
    }, 500);
});

// ==================== Form Loading State ====================
function setSubmitLoading(isLoading) {
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;

    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="animate-spin">⏳</span>
            جاري الإرسال...
        `;
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `📱 إرسال عبر واتساب`;
    }
}

// ==================== Form Reset ====================
function resetForm() {
    const form = document.getElementById('surveyForm');
    if (form) {
        form.reset();
        // Clear all error messages
        document.querySelectorAll('.form-error').forEach(el => el.remove());
        document.querySelectorAll('.form-group input, .form-group select').forEach(field => {
            field.style.borderColor = 'var(--border)';
            field.style.boxShadow = '';
        });
    }
}

// ==================== Category Button Click Handler ====================
document.addEventListener('DOMContentLoaded', function() {
    // عرض صور الفئة الأولى افتراضياً
    displayCategoryImages('reception');

    // إضافة مستمعين لأزرار الفئات
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من الزراير الأخرى
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر الحالي
            this.classList.add('active');

            // عرض الصور للفئة المختارة
            const category = this.getAttribute('data-category');
            displayCategoryImages(category);
        });
    });

    setupFieldValidation();
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// ==================== Smooth Scroll Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});





// ==================== Social Media Buttons ==================== 
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Button
    const whatsappBtn = document.querySelector('.wrapper .whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            showWhatsAppOptions();
        });
    }

    // TikTok Button
    const tiktokBtn = document.querySelector('.wrapper .tiktok');
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', function() {
            window.open('https://www.tiktok.com/@yourusername', '_blank');
        });
    }

    // Instagram Button
    const instagramBtn = document.querySelector('.wrapper .instagram');
    if (instagramBtn) {
        instagramBtn.addEventListener('click', function() {
            window.open('https://www.instagram.com/yourusername', '_blank');
        });
    }
});

// ==================== WhatsApp Numbers Selection ====================
function showWhatsAppOptions() {
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="modal-header">
                <h3>اختر رقم التواصل</h3>
                <span class="close-whatsapp-modal">&times;</span>
            </div>
            <div class="whatsapp-options">
                <button class="whatsapp-option" onclick="openWhatsApp('201125933005')">
                    <span class="whatsapp-icon">📱</span>
                    <div class="option-info">
                        <p class="option-title">المايسترو للتصميم</p>
                        <p class="option-number">201125933005</p>
                    </div>
                </button>
                <button class="whatsapp-option" onclick="openWhatsApp('201000000000')">
                    <span class="whatsapp-icon">📱</span>
                    <div class="option-info">
                        <p class="option-title">فريق المبيعات</p>
                        <p class="option-number">201000000000</p>
                    </div>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إغلاق المودال
    modal.querySelector('.close-whatsapp-modal').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function openWhatsApp(phoneNumber) {
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, '_blank');
    document.querySelector('.whatsapp-modal').remove();
}















// إظهار/إخفاء زر العودة للأعلى
window.addEventListener('scroll', function() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// العودة للأعلى بسلاسة عند الضغط
document.querySelector('.scroll-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


