(() => {
  const { state, settings, ps4 } = demoData;
  const version = 'PS4Mount CALLiONE manual 1.1';
  const drives = [
    { path: '/data', name: 'Internal SSD', folder: '/data/homebrew/CALLiONE/Games', external: false, free: 420000000000 },
    { path: '/mnt/usb0', name: 'USB drive', folder: '/mnt/usb0/homebrew/CALLiONE/Games', external: true, free: 300000000000 }
  ];
  let ps4Running = false;
  let job = { phase: 'idle', done: 0, total: 0 };
  const json = value => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } });
  const log = message => state.log.push('[DEMO] ' + message);
  const rejected = () => new Response('Action unavailable in the public demo.', { status: 409 });
  state.version = '1.1 Demo';
  state.services.detail = 'Demo services · no PS5 connected';

  window.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url || input.href, location.href);
    if (url.origin !== location.origin) return rejected();
    const path = url.pathname;
    const body = typeof options.body === 'string' ? options.body : '';
    const data = () => JSON.parse(body || '{}');
    if ((options.method || input.method || 'GET').toUpperCase() === 'GET') {
      if (path === '/api/state') return json(state);
      if (path === '/api/settings') return json(settings);
      if (path === '/api/updates') return json({ phase: 'disabled', releases: [], error: 'Updates are disabled in the demo.' });
      if (path === '/api/backports') return json({ sources: [], games: [], packages: [], entries: [], items: [], phase: 'idle' });
      if (path === '/api/klog') return json({ content: '[DEMO] No console connected.', truncated: false });
      if (path === '/api/ps4/games') return json({ version, running: ps4Running, games: ps4Running ? ps4 : [] });
      if (path === '/api/installer/destinations') return json(drives);
      if (path === '/api/installer/status') {
        if (job.started && job.phase !== 'cancelled') {
          job.done = Math.min(job.total, Math.round((Date.now() - job.started) * job.total / 6500));
          job.phase = job.done === job.total ? 'complete' : job.mode === 'system' ? 'installing' : 'copying';
          job.cancellable = job.done < job.total;
        }
        return json(job);
      }
      if (/^\/api\/(image-)?sizes\//.test(path)) return json({ game: 4000000000, dlc: 0, save: 0, cache: 32000000 });
      return new Response(null, { status: 404 });
    }
    if (path === '/api/settings') {
      Object.assign(settings, data());
      return json({});
    }
    if (path === '/api/installer/browse') {
      const entries = body ? [{ name: 'Demo-game.pkg', path: body + '/Demo-game.pkg', directory: false, size: 4000000000 }] :
        [{ name: 'USB · Demo', path: '/mnt/usb0', directory: true }, { name: 'Internal · FTP PKGs', path: '/data/pkg-install', directory: true }];
      return json({ path: body, entries });
    }
    if (path === '/api/installer/start') {
      const request = data();
      job = { phase: 'queued', mode: request.mode, path: request.path, name: 'Demo-game.pkg', done: 0, total: 4000000000, started: Date.now(), cancellable: true };
      log('Simulated install started.');
      return json({ queued: true });
    }
    if (path === '/api/installer/cancel') {
      job.phase = 'cancelled';
      job.cancellable = false;
      return json({});
    }
    if (path.startsWith('/api/ps4/')) {
      const action = path.split('/').pop();
      if (action === 'start') ps4Running = true;
      if (action === 'stop') {
        ps4Running = false;
        for (const game of ps4) game.state = 'removed';
      }
      if (action === 'mount' || action === 'unmount') {
        const game = ps4.find(game => game.title_id === data().title_id);
        if (!ps4Running || !game) return rejected();
        game.state = action === 'mount' ? 'ready' : 'removed';
      }
      return json({ ok: true, message: 'Demo action completed.' });
    }
    if (path.startsWith('/api/playgo/')) {
      const game = state.games.find(game => game.title_id === path.split('/').pop());
      if (!game) return rejected();
      game.playgo_enabled = body === 'on';
      return json({});
    }
    if (/^\/api\/(rescan|rebuild-all|rebuild\/|launch\/|ui-log)/.test(path)) {
      log('Simulated ' + path.split('/')[2] + '.');
      return new Response(null, { status: 204 });
    }
    return rejected();
  };
})();
