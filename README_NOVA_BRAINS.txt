# NOVA Brains Package

Generated: 2025-09-09 03:36:34

This bundle contains:
- nova_brains_core.csv — normalized occupations (SOC, title, Job Zone, slug) derived from All_Occupations.csv.
- nova_ooh_enrichment_schema.csv — the fields to populate from OOH (median pay, growth %, openings, education, etc.).
- nova_brains_joined.csv — core occupations left-joined to enrichment schema; safe to load now and later enrich.
- Source files you provided (for provenance): All_Occupations.csv, XML from OOH.pdf (XML text inside PDF), xml-compilation.webarchive (raw OOH feed container), text.txt (notes), and your Numbers sheet if present.

## How to Use
1. Load `nova_brains_joined.csv` into NOVA/NAVI as the occupations table.
2. When ready to enrich with OOH quick facts, populate these columns in `nova_brains_joined.csv`:
   - median_annual_wage_2024
   - median_hourly_wage_2024
   - growth_pct_2024_2034
   - openings_per_year
   - education_entry
   - work_experience
   - on_the_job_training

3. Keep `nova_ooh_enrichment_schema.csv` as reference for exact headers.
4. If you obtain the raw OOH XML (not wrapped in PDF/webarchive), parse it and merge by SOC code to fill those fields.

## File Checksums
{
  "nova_brains_core.csv": "cc26921ac5c03d7818ee7151bf4c8b5478183eda35199f1a2524525ba262932b",
  "nova_ooh_enrichment_schema.csv": "dc7b6029635e53c9aeff13715bbbdc17bb501f5be2a1ca4ed043192c0a4f4745",
  "nova_brains_joined.csv": "f6d294332f32df73112a5d32f9e48e3fdc62906dd72884ad9ccc8f4c0146a392",
  "All_Occupations.csv": "a4ef6ec84b0ce928e41835a15ee810766eba0df4497ccecc35ffd787f249c2f3",
  "All_Occupations.numbers": "489a5a843a249158f9fd71af042a16877a30fe22bcf535ed2449620030501a20",
  "XML from OOH.pdf": "74aaf9949357f8c1caa3db9be10eb3fdd5f46a512ab4cc398cc91377c7b9cd53",
  "xml-compilation.webarchive": "94e3e0a061b3423549e6f56f8d407d95ff0b0011cd75759e2fe2a3ae45fec381",
  "text.txt": "0f4f1fec14788666201f932916d09917f8c87da970d5cde2523c769a61895670"
}