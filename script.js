/* Project category filter.

   HOW TO EDIT CATEGORIES
   ----------------------
   The table below is the only place categories are defined. Each key is a
   filter button (its data-filter value in index.html). Each list holds the
   visible tag names that belong to that button.

   To retag a project: change the <li class="tag"> text on its card. Nothing else.
   To add a filter:    add a key here, then add a matching button in index.html.
   To retire a filter: remove the key and the button.

   A tag that appears in no list below simply won't be matched by any filter.
   The project still shows under "All", and a note appears in the browser
   console so you can spot the typo.                                          */

(function () {
  var GROUPS = {
    mechanical: ["Mechanical Design", "Prototyping", "Manufacturing", "Electromechanical"],
    electrical: ["Electrical System Design", "Electromechanical"],
    test:       ["Test Engineering"],
    propulsion: ["Propulsion Systems"]
  };

  var buttons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('#project-grid .card');
  var count = document.getElementById('filter-count');
  if (!buttons.length || !cards.length) return;

  function norm(text) {
    return text.replace(/\s+/g, ' ').trim().toLowerCase();
  }

  // Invert the table above into: tag name -> the filters it belongs to.
  var tagLookup = {};
  Object.keys(GROUPS).forEach(function (group) {
    GROUPS[group].forEach(function (tag) {
      var key = norm(tag);
      if (!tagLookup[key]) tagLookup[key] = [];
      tagLookup[key].push(group);
    });
  });

  // Read each card's tags once, on load.
  var entries = [];
  Array.prototype.forEach.call(cards, function (card) {
    var groups = [];
    Array.prototype.forEach.call(card.querySelectorAll('.tag'), function (el) {
      var matches = tagLookup[norm(el.textContent)];
      if (!matches) {
        console.warn('No filter covers the tag "' + el.textContent.trim() +
                     '". Add it to the GROUPS table in script.js.');
        return;
      }
      matches.forEach(function (group) {
        if (groups.indexOf(group) === -1) groups.push(group);
      });
    });
    entries.push({ el: card, groups: groups });
  });

  function apply(filter) {
    var shown = 0;

    entries.forEach(function (entry) {
      var match = filter === 'all' || entry.groups.indexOf(filter) !== -1;
      entry.el.hidden = !match;
      if (match) shown++;
    });

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
    });

    if (count) {
      count.textContent = filter === 'all'
        ? 'Showing all ' + shown + ' projects'
        : 'Showing ' + shown + ' of ' + entries.length + ' projects';
    }
  }

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.dataset.filter);
    });
  });
})();
