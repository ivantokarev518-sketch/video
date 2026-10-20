document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('backgroundVideo');
  const soundButton = document.getElementById('soundButton');

  // Автозапуск видео без звука
  video.muted = true;
  video.playsInline = true;
  video.loop = true;

  const startVideo = () => {
    const result = video.play();

    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        soundButton.textContent = 'Запустить видео';
      });
    }
  };

  startVideo();

  // Если видео приостановилось, пробуем запустить снова
  video.addEventListener('canplay', startVideo, { once: true });

  soundButton.addEventListener('click', async () => {
    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        soundButton.textContent = 'Видео недоступно';
        return;
      }
    }

    video.muted = !video.muted;

    soundButton.textContent = video.muted
      ? 'Включить звук'
      : 'Выключить звук';
  });

  // Плавное появление карточек при прокрутке
  const cards = document.querySelectorAll('.glass-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach(card => observer.observe(card));
  }

  // Ссылка на отдельное открытие Google Forms
  const iframe = document.getElementById('googleForm');
  const formLink = document.getElementById('formLink');

  if (iframe && formLink) {
    formLink.href = iframe.src;
  }
});
