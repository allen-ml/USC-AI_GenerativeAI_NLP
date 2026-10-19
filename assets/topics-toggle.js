(() => {
  const button = document.getElementById('toggle-all-topics');
  if (!button) return;
  const groups = Array.from(document.querySelectorAll('#schedule .week-topics'));
  if (!groups.length) return;
  let expanded = true;
  button.hidden = false;
  button.addEventListener('click', () => {
    expanded = !expanded;
    groups.forEach(group => { group.hidden = !expanded; });
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Collapse all topics' : 'Expand all topics';
  });
})();
