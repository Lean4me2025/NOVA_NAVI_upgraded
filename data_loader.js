(async function(){
  const status = document.getElementById('status');
  const elTable = document.getElementById('table');
  function say(html){ status.innerHTML += `<p>${html}</p>`; }
  async function tryFetch(path){
    try {
      const res = await fetch(path);
      if(!res.ok) throw new Error(res.status + ' ' + res.statusText);
      return await res.text();
    } catch (e) { return null; }
  }
  // Prefer JSON if available, otherwise CSV
  let data = null, using = null;
  let txt = await tryFetch('nova_brains_full.json');
  if(txt){ using = 'nova_brains_full.json'; data = JSON.parse(txt); }
  else {
    txt = await tryFetch('nova_brains_full.csv');
    if(txt){ using = 'nova_brains_full.csv'; 
      // simple CSV parser
      const lines = txt.split(/\r?\n/).filter(Boolean);
      const headers = lines.shift().split(',');
      data = lines.slice(0, 50).map(line => {
        const cells = []; let cur = ''; let inQ=false;
        for(let i=0;i<line.length;i++){
          const c = line[i];
          if(c === '"'){ inQ = !inQ; }
          else if(c === ',' && !inQ){ cells.push(cur); cur=''; }
          else { cur += c; }
        }
        cells.push(cur);
        const o = {}; headers.forEach((h,i)=>o[h]=cells[i]);
        return o;
      });
    }
  }
  if(data){
    say(`<span class="ok">Loaded <b>${using}</b> successfully.</span>`);
    // render small preview table
    const keys = Object.keys(data[0] || {}).slice(0, 8);
    let html = '<table><thead><tr>' + keys.map(k=>`<th>${k}</th>`).join('') + '</tr></thead><tbody>';
    (data.slice(0, 10)).forEach(row=>{
      html += '<tr>' + keys.map(k=>`<td>${row[k] ?? ''}</td>`).join('') + '</tr>';
    });
    html += '</tbody></table>';
    elTable.innerHTML = html;
  } else {
    say('<span class="warn">Could not find nova_brains_full.json/csv. Place one of them alongside this file.</span>');
  }
})();