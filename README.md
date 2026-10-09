# FitLT — pilna versija

Nemokama, pilnai atrakinta FitLT versija asmeniniam naudojimui.
Mokamoji versija (fitlt.eu) lieka atskirai, aplanke `../fitlt/` — šis aplankas jos nekeičia.

## Kuo skiriasi nuo fitlt.eu

| | fitlt.eu (mokama) | ši versija |
|---|---|---|
| 17 pratimų su vaizdo paieška | 5 nemokami, 12 už užrakto | visi 17 |
| Stripe mokėjimai, premium kodai | yra | išimta |
| Kainų langas, „⭐ Premium" ženklelis | yra | išimta |
| Duomenų kopija (eksportas/importas) | nebuvo | **yra** (skirtuke „📈 Pažanga") |

## Failai

- `index.html` — visa programa
- `manifest.json`, `sw.js`, `icon-*.png` — PWA (įsidiegia į telefono pradinį ekraną, veikia be interneto)
- `README.md` — šis failas

Taip pat yra viename faile supakuota versija: `~/Desktop/FitLT-pilna.html`.
Ją galima tiesiog atidaryti dukart paspaudus arba persiųsti draugui kaip failą —
nieko nereikia įdiegti, viskas (ikonos, manifestas) sudėta į vidų.

## Duomenys

Visi duomenys saugomi tik tame įrenginyje (`localStorage`), niekur neišsiunčiami.
Todėl:
- kiekvienas vartotojas turi savo atskirus duomenis;
- pakeitus telefoną ar išvalius naršyklės duomenis, jie prapuola.

Dėl to pridėta **„💾 Duomenų kopija"** kortelė skirtuke „📈 Pažanga":
„⬇️ Atsisiųsti kopiją" išsaugo JSON failą, „⬆️ Įkelti kopiją" jį atkuria kitame įrenginyje.

## Įdiegimas į internetą (jei reikia nuorodos telefonui)

```bash
cd ~/Desktop/Websites/fitlt-pilna
vercel login          # vienąkart, atsidarys naršyklė
vercel deploy --prod --yes
```

Pirmą kartą Vercel paklaus projekto pavadinimo — tinka `fitlt-pilna`.
Gautą nuorodą telefone atidaryk ir pasirink „Įsidėti į pradinį ekraną".
