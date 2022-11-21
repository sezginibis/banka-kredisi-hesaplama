vadeInput.style.display = 'none'
krediBasvur.style.display = 'none'
uyari.style.display = 'none'
sonuc.style.display = 'none'

function krediTuruSelect() {
    let krediTuruValue = krediTuru.value
    let turmetin = krediTuru.options[krediTuru.selectedIndex].text
    // talepInput.style.display = 'none'
    if (krediTuru.value === 'sec') {
        uyari.style.display = 'none'
        talepInput.style.display = 'none'
        vadeInput.style.display = 'none'
        krediBasvur.style.display = 'none'
        sonuc.style.display = 'none'
    } else if (krediTuruValue === 'tuketici') {
        uyari.style.display = 'none'
        talepInput.style.display = 'block'
        sonuc.style.display = 'none'
    } else if (krediTuruValue === 'tasit') {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Şu anda taşıt kredisi başvurularımız aktif değildir.</b>"
        talepInput.style.display = 'none'
        vadeInput.style.display = 'none'
        krediBasvur.style.display = 'none'
        sonuc.style.display = 'none'
    } else if (krediTuruValue === 'konut') {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Şu anda konut kredisi başvurularımız aktif değildir.</b>"
        talepInput.style.display = 'none'
        vadeInput.style.display = 'none'
        krediBasvur.style.display = 'none'
        sonuc.style.display = 'none'
    } else {
        talepInput.disabled = true
    }

}
krediTuru.onchange = krediTuruSelect
krediTuruSelect()

talepInput.addEventListener("change", (event) => {
    number = event.target.value
    if (number <= 999) {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Talep edilecek en düşük tutar &#x20BA;1.000 olmalıdır.</b>"
    } else if (number >= 1000) {
        uyari.style.display = 'none'
        vadeInput.style.display = 'block'
        krediBasvur.style.display = 'block'
    }
})

let basvuruyuTamamla = (e) => {
    if (!vadeInput.value) {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Lütfen krediniz için bir vade süresi giriniz.</b>"
    } else if (krediTuru.value === '') {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Kredi Türünü Seçmelisiniz.</b>"
    } else if (talepInput.value < 1000) {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Kredi için girdiğiniz tutarın &#x20BA;1.000 düşük olmayacağını sanırım söylemiştik.</b>"
    } else if (talepInput.value > 40000) {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Kredi için girdiğiniz tutar &#x20BA;40.000 daha fazla olamaz.</b>"
    } else if (vadeInput.value < 3) {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Kredi için girdiğiniz vade ayı 3'ten küçük olamaz.</b>"
    } else if (vadeInput.value > 30) {
        uyari.style.display = 'block'
        uyari.innerHTML = "<b>Kredi için girdiğiniz vade ayı 30'dan büyük olamaz.</b>"
    } else {
        uyari.style.display = 'none'
        sonuc.style.display = 'block'

        const a = talepInput.value
        const n = vadeInput.value
        const r = (1.59 / 100)
        const k = (15 / 100)
        const b = (5 / 100)
        const c = (r * (1 + k + b))
        const t = ((a * c) / (1 - (1 / (Math.pow(1 + c, n)))))
        const g = (t * n)

        talepEdilenTutar.innerText = a
        talepEdilenVade.innerText = n
        kkdfBsmv.innerText = c
        taksitTutari.innerText = parseFloat(t).toFixed(2)
        toplamGeriOdeme.innerText = parseFloat(g).toFixed(2)

    }
}