# oversubs

## Özellikler

- **OLED Siyah Tasarım:** Saf siyah arka plan ve gri tonlamalı modern arayüz.
- **Fluent UI:** Microsoft'un Fluent tasarım sistemi ile geliştirilmiş web bileşenleri.
- **Minimalist Oynatıcı:** Karmaşadan uzak, temiz bir video izleme deneyimi.
- **Config Editor:** Serileri, sezonları ve bölümleri yönetebileceğiniz gelişmiş, bağımsız GUI araç takımı (`public/editor.html`).

## Teknoloji Yığını

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Components:** [@fluentui/web-components](https://fluentui.dev/)
- **Styling:** Vanilla CSS & Fluent UI Design Tokens

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Ardından tarayıcınızda `http://localhost:5173` adresine giderek platformu görebilirsiniz.

## Konfigürasyon Düzenleyici

Veri yapısını (`src/data/config.json`) kolayca düzenlemek için dahili GUI aracını kullanabilirsiniz:
`http://localhost:5173/editor.html`

Bu araç sayesinde JSON koduna dokunmadan serileri ve bölümleri ağaç yapısı üzerinden güncelleyebilirsiniz.

## Dağıtım (Deploy)

Bu proje GitHub Actions ile entegre edilmiştir. `main` dalına yapılan her push işlemi otomatik olarak GitHub Pages üzerinde yayınlanır.

---

**oversubs** - *ovrhead* tarafından geliştirilmiştir.
