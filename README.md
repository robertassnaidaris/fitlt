# FitLT — pilna versija

Nemokama, pilnai atrakinta FitLT versija.

**🔗 Gyva nuoroda: https://robertassnaidaris.github.io/fitlt/**

Nuoroda vieša — gali laisvai dalintis su kuo nori, nereikia jokių prisijungimų.

## Įsidiegti į telefoną

1. Atidaryk nuorodą telefone
2. **iPhone (Safari):** dalinimosi mygtukas → „Į pradinį ekraną"
   **Android (Chrome):** meniu ⋮ → „Įdiegti programą"
3. Atsiras ikona kaip tikra programėlė; veiks ir be interneto

## Kuo skiriasi nuo fitlt.eu (mokamos versijos)

| | fitlt.eu | ši versija |
|---|---|---|
| Pratimai su vaizdo paieška | 5 nemokami, 12 už užrakto | **visi 17** |
| Stripe mokėjimai, premium kodai | yra | išimta |
| Kainų langas, „⭐ Premium" ženklelis | yra | išimta |
| Duomenų kopija (eksportas/importas) | nebuvo | **yra** |

Mokamoji versija (aplankas `../fitlt/`, fitlt.eu) lieka nepaliesta.

## Duomenys

Viskas saugoma tik naudotojo įrenginyje (`localStorage`) — niekur neišsiunčiama,
nėra jokio serverio ar paskyrų. Todėl:

- kiekvienas naudotojas turi savo atskirus duomenis;
- pakeitus telefoną ar išvalius naršyklės duomenis, jie prapultų.

Dėl to skirtuke **„📈 Pažanga"** apačioje yra **„💾 Duomenų kopija"**:
„⬇️ Atsisiųsti kopiją" išsaugo JSON failą, „⬆️ Įkelti kopiją" jį atkuria kitame įrenginyje.

## Failai

- `index.html` — visa programa (vienas failas, be išorinių bibliotekų)
- `manifest.json`, `sw.js`, `icon-*.png` — PWA: įsidiegimas ir darbas be interneto
- `build-single.py` — sugeneruoja viską viename faile į `~/Desktop/FitLT-pilna.html`
  (ikonos ir manifestas sudedami kaip data URI; tą failą galima tiesiog persiųsti)

Keliai sąmoningai reliatyvūs (`./`), kad veiktų ir po adreso paadresiu, kaip
`github.io/fitlt/`, ir atidarius failą tiesiogiai.

## Atnaujinimas

```bash
cd ~/Desktop/Websites/fitlt-pilna
# ...pakeitimai index.html...
python3 build-single.py          # atnaujinti vieno failo versiją
git add -A && git commit -m "..." && git push
```

Po `push` GitHub Pages persistato per ~1 min. Pakeitus `index.html` verta
pakelti `CACHE` versiją `sw.js` (`fitlt-pilna-v1` → `v2`), kad naudotojai
gautų šviežią kodą be rankinio naršyklės valymo.
