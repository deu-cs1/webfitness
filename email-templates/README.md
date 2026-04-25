# KineticApp E-posta Template'leri

Bu klasörde linkle çalışan iki saf HTML/CSS e-posta template'i bulunur:

- `reset-password.html`: Şifre sıfırlama e-postası
- `verify-email.html`: Hesap/e-posta doğrulama e-postası

## Placeholder'lar

Template'leri mail sağlayıcına göre aşağıdaki değişkenlerle doldurabilirsin:

- `{{name}}`: Kullanıcı adı veya kısa selamlama değeri
- `{{reset_link}}`: Şifre sıfırlama linki
- `{{verification_link}}`: Hesap doğrulama linki
- `{{year}}`: Güncel yıl

## Tasarım notları

- Renk paleti `App.tsx` içindeki KineticApp tasarım diliyle uyumludur.
- E-posta istemcileri için tablo tabanlı iskelet ve responsive CSS kullanır.
- Dış font, görsel veya framework bağımlılığı yoktur.
