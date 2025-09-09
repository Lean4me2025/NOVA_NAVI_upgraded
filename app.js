
(function(){
  function wire(id, url){
    const el = document.getElementById(id);
    if(url && /^https?:\/\//.test(url)){ el.href = url; el.classList.add('primary'); el.style.opacity=1; el.style.cursor='pointer'; }
    else { el.href='#'; el.style.opacity=.5; el.style.cursor='not-allowed'; }
  }
  const L = (window.NOVA_PRODUCT_LINKS||{});
  wire('btnStarter', L.starter); wire('btnPro', L.pro); wire('btnProSeries', L.proSeries);
})();

async function loadBrains(){
  try { return await fetch('nova_brains_full.json',{cache:'no-store'}).then(r=>r.json()); } catch(e){}
  const txt = await fetch('nova_brains_full.csv',{cache:'no-store'}).then(r=>r.text());
  const lines = txt.split(/\r?\n/).filter(Boolean);
  const headers = lines.shift().split(',');
  return lines.map(line => {
    let cur='', inQ=false, cells=[];
    for (let i=0;i<line.length;i++){
      const c=line[i];
      if(c==='\"'){ inQ=!inQ; }
      else if(c===',' && !inQ){ cells.push(cur); cur=''; }
      else { cur+=c; }
    }
    cells.push(cur);
    const o={}; headers.forEach((h,i)=>o[h]=cells[i]); return o;
  });
}

function fmtMoney(n){ const x=Number(n); return Number.isFinite(x)?x.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0}):''; }
function fmtInt(n){ const x=Number(n); return Number.isFinite(x)?Math.round(x).toLocaleString():''; }

(async function(){
  const data = await loadBrains();
  const prefs = JSON.parse(sessionStorage.getItem('nova_traits') || '{"traits":[],"zone":""}');
  const zonePref = prefs.zone; const traits = prefs.traits || [];

  const rows = data.slice();
  rows.forEach(r => {
    const growth = Number(r.growth_pct_2024_2034 || r.growth_pct || 0) || 0;
    const pay = Number(r.median_annual_wage_2024 || r.median_annual_wage || 0) || 0;
    const zone = Number(r.job_zone || r['job_zone'] || 0) || 0;
    let score = growth*2 + (pay/10000);
    if(zonePref && zone === Number(zonePref)) score += 50;
    r.__score = score;
  });
  rows.sort((a,b)=>(b.__score||0)-(a.__score||0));
  const top = rows.slice(0,25);

  document.getElementById('summary').innerHTML =
    `<div><strong>Selected Zone:</strong> ${zonePref || 'Any'} &nbsp; <span class="badge">${traits.length} traits chosen</span></div>`;

  const tbody = document.querySelector('#resultsTable tbody'); tbody.innerHTML='';
  top.forEach(r => {
    const tr = document.createElement('tr');
    const pay = fmtMoney(r.median_annual_wage_2024 || r.median_annual_wage);
    const growth = (Number(r.growth_pct_2024_2034 || r.growth_pct) || 0).toFixed(1);
    const openings = fmtInt(r.openings_per_year);
    tr.innerHTML = `<td>${r.occupation || r.title_ooh || ''}</td>
      <td>${r.soc_code || ''}</td><td>${r.job_zone || ''}</td>
      <td>${pay}</td><td>${growth}</td><td>${openings}</td>`;
    tbody.appendChild(tr);
  });
})();
