import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Container, Divider, GoogleButton } from './Auth.styled';
import { AuthButton } from '../../components/Button/Button.style';
import { useGoogleLogin } from '../../hooks/useGoogleLogin'; // yo‘lni moslang
import { useRouter } from 'next/router';

function AuthPage() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [phoneError, setPhoneError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Sahifa yuklanganda localStorage dan nomer va otpSent holatini olish
  useEffect(() => {
    const savedPhone = localStorage.getItem('phone');
    const savedOtpSent = localStorage.getItem('otpSent');

    if (savedPhone) setPhone(savedPhone);
    if (savedOtpSent === 'true') setOtpSent(true);
  }, []);

  // Timer
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Faqat bitta raqamni qabul qiladi
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
    }
  };
  
  const handleFocus = () => {
    // Bo‘sh eng birinchi input indeksini topamiz
    const firstEmptyIndex = otp.findIndex(digit => digit === '');
  
    // Agar bo‘sh input topilsa, unga fokus beramiz, aks holda birinchi inputga
    const focusIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
  
    inputsRef.current[focusIndex]?.focus();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // default harakatni to‘xtatamiz
      const newOtp = [...otp];
  
      if (otp[index] !== '') {
        // Faqat shu inputni tozalash
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Oldingi inputga o‘tamiz va uni tozalaymiz
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePhoneSubmit = () => {
    if (!phone.trim()) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setOtpSent(true);
    setTimer(30);

    // Nomerni va otpSent holatini localStorage ga saqlaymiz
    localStorage.setItem('phone', phone);
    localStorage.setItem('otpSent', 'true');
  };

  // Telefon raqam o‘zgarganda localStorage yangilansin
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    localStorage.setItem('phone', value);
    if (phoneError) setPhoneError(false);
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (otp.some((digit) => digit === '')) {
      setOtpError(true);
      return;
    }
  
    setOtpError(false);
    console.log('Tasdiqlanayotgan OTP:', code);

    // Tasdiqlangandan keyin localStorage dan ma'lumotlarni o'chirish (ixtiyoriy)
    localStorage.removeItem('phone');
    localStorage.removeItem('otpSent');

    router.push('/home');
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  // Google login muvaffaqiyatli bo‘lganda chaqiriladi
  const handleLoginSuccess = useCallback(async (response: { credential: any }) => {
    const idToken = response.credential;
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Muvaffaqiyatli Google orqali login bo‘ldi');
        // keyingi harakat: navigate yoki token saqlash
      }
    } catch (error) {
      console.error('Google login xatosi:', error);
    }
  }, []);

  const handleLoginError = useCallback((error: any) => {
    console.error('Google login xatosi:', error);
  }, []);

  useGoogleLogin({
    clientId,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return (
    <Container>
      <Card>
        {!otpSent ? (
          <>
            <h3>Авторизация</h3>
            <p>Ha ваш номер будет отправлен смс код для подтверждения регистрации</p>
            <div className='input-wrapper'>
              <input
                type="text"
                placeholder='Введите свой номер телефона'
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  const cleaned = value.replace(/[^\d+]/g, '');
                  const formatted = cleaned.startsWith('+')
                    ? '+' + cleaned.slice(1).replace(/\+/g, '')
                    : cleaned.replace(/\+/g, '');
                  handlePhoneChange(formatted);
                }}
                className={phoneError ? 'error' : ''}
              />
              {phoneError && <p className='error-message'>Пожалуйста, введите номер телефона</p>}
              <p>
                Нажимая кнопку вы соглашаетесь c <a href='#'>публичной офертой</a>
              </p>
            </div>

            <AuthButton type='button' onClick={handlePhoneSubmit}>
              Получить код
            </AuthButton>
            <Divider>
              <span>ИЛИ</span>
            </Divider>
            {/* Google Sign-In button */}
            <GoogleButton>
              Продолжить через Google
              <div
                id="g_id_signin"
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </GoogleButton>
          </>
        ) : (
          <>
            <h3>Код подтверждения</h3>
            <p>На ваш номер будет отправлен смс код для подтверждения регистрации</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d?$/.test(value)) {
                      handleOtpChange(value, index);
                      if (otpError) setOtpError(false);
                    } else {
                      e.target.value = ''; // Noto‘g‘ri qiymatni tozalash
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => {
                    if (otp[index] === '') handleFocus();
                  }}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  className={otpError ? 'error' : ''}
                  style={{
                    width: '40px',
                    height: '40px',
                    fontSize: '24px',
                    textAlign: 'center',
                    border: otpError ? '1px solid red' : '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                />
              ))}
            </div>
            {otpError && (
              <p className='error-message' style={{ textAlign: 'center', color: 'red', marginBottom: '10px' }}>
                Пожалуйста, введите полный код
              </p>
            )}

            <p style={{ textAlign: 'center' }}>0:{timer < 10 ? `0${timer}` : timer}</p>
            <AuthButton
              type='button'
              onClick={handleVerify}
            >
              Подтвердить
            </AuthButton>
          </>
        )}
      </Card>
    </Container>
  );
}

export default AuthPage;