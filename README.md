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
| Valdymas | 8 skirtukai viršuje | **apatinė juosta + „+" mygtukas** |
| Maisto suvedimas | ranka rašyti kcal, B/AV/R | **paieška 207 produktų bazėje** |
| Treniruotės | ranka rašyti sudegintas kcal | **58 veiklos, skaičiuoja pagal svorį (MET)** |
| Pagrindinis ekranas | suvestinė su žiedu | **dienynas: Tikslas − Maistas + Mankšta = Liko** |
| Pratimai su vaizdo paieška | 5 nemokami, 12 už užrakto | **visi 17** |
| Stripe mokėjimai, premium kodai | yra | išimta |
| Duomenų kopija (eksportas/importas) | nebuvo | **yra** |

Mokamoji versija (aplankas `../fitlt/`, fitlt.eu) lieka nepaliesta.

## Valdymas

Perdaryta pagal klasikinį MyFitnessPal dienyną — tą patį išdėstymą, kurį
naudotojai gynė, kai 2026 m. balandį gamintojas jį pakeitė ir reitingas krito.

**Apatinė juosta:** Dienynas · Planas · **➕** · Pažanga · Daugiau

- **Dienynas** — pagrindinis ekranas. Viršuje `Tikslas − Maistas + Mankšta = Liko`,
  žemiau keturios valgymų kortelės (pusryčiai, pietūs, vakarienė, užkandis),
  treniruotės, vanduo ir svoris. Prie kiekvieno — „+ Pridėti".
- **➕** — greitas pridėjimas iš bet kur: maistas, treniruotė, stiklinė vandens, svoris.
- **Daugiau** — pratimų biblioteka, receptai, profilis, kalba, duomenų kopija.

## Duomenų bazės

- `FOODS` — 207 produktai, reikšmės 100 g; kiekvienam 2–3 porcijų variantai
  („1 vnt (120 g)", „Porcija (150 g)"). Įtraukti lietuviški patiekalai:
  cepelinai, šaltibarščiai, kugelis, balandėliai, kibinai, šakotis, vėdarai.
  Visos reikšmės patikrintos pagal Atwater formulę (kcal ≈ 4B + 4AV + 9R).
- `METS` — 58 veiklos su MET koeficientais (Compendium of Physical Activities).
  Kalorijos: `MET × 3,5 × svoris(kg) / 200 × minutės` — naudotojui nieko
  skaičiuoti nereikia, svoris imamas iš paskutinio įrašo arba profilio.

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
