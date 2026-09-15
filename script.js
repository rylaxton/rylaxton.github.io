/* Project category filter.
   Each card in index.html carries data-groups="mechanical electrical other".
   Each button carries data-filter="mechanical" (or "all").
   To add a new category: add the word to a card's data-groups, then add a
   matching button in the .filters block. Nothing else needs to change. */

(function () {
  var buttons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('#project-grid .card');
  var count = document.getElementById('filter-count');
  if (!buttons.length || !cards.length) return;

  function apply(filter) {
    var shown = 0;

    cards.forEach(function (card) {
      var groups = (card.getAttribute('data-groups') || '').split(/\s+/);
      var match = filter === 'all' || groups.indexOf(filter) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
    });

    if (count) {
      count.textContent = filter === 'all'
        ? 'Showing all ' + shown + ' projects'
        : 'Showing ' + shown + ' of ' + cards.length + ' projects';
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.dataset.filter);
    });
  });
})();
