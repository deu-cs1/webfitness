# KineticApp E-posta Template'leri

Bu klasörde linkle çalışan saf HTML/CSS e-posta template'leri bulunur:

- `reset-password.html`: Şifre sıfırlama e-postası
- `verify-email.html`: Hesap/e-posta doğrulama e-postası
- `demo-access.html`: Demo erişimi onaylandı ve şifre oluşturma e-postası

## Placeholder'lar

Template'leri mail sağlayıcına göre aşağıdaki değişkenlerle doldurabilirsin:

- `{{name}}`: Kullanıcı adı veya kısa selamlama değeri
- `{{email}}`: Demo hesabı için kullanılan e-posta adresi
- `{{reset_link}}`: Şifre sıfırlama linki
- `{{verification_link}}`: Hesap doğrulama linki
- `{{password_setup_link}}`: Demo hesabı için şifre oluşturma linki
- `{{year}}`: Güncel yıl

## Tasarım notları

- Renk paleti `App.tsx` içindeki KineticApp tasarım diliyle uyumludur.
- E-posta istemcileri için tablo tabanlı iskelet ve responsive CSS kullanır.
- Dış font, görsel veya framework bağımlılığı yoktur.
