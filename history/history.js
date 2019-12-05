function setHistoryState(url) {
    if (!window.history) return;

    var states = history.state ? history.state : [location.href];
    
    states.push(url);
    history.pushState(states, '', url);
    location.reload();
}