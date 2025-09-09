
document.getElementById('startBtn')?.addEventListener('click', () => {
  window.location.href = 'traits.html';
});
const audio = document.getElementById('welcomeAudio');
document.getElementById('audioBtn')?.addEventListener('click', async () => {
  try { await audio.play(); } catch (e) { alert('Could not play audio.'); }
});
