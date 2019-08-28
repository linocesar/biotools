var data = {}

document.getElementById("fasta").addEventListener('change', function () {

    var filereader = new FileReader();
    var re = new RegExp(/^>/);
    var head = "";

    filereader.onload = function () {

        const linhas = this.result.split("\n");

        for (let index = 0; index < linhas.length; index++) {
            var linha = linhas[index].replace(/\r/g, '');

            if (re.test(linha)) {

                var aux = linha.split(" ");
                var id = aux[0].replace(/^>/ig, "");
                head = id;
                data[head] = "";

            } else {
                data[head] += linha + "\n";
            }
        }

    }

    filereader.readAsText(this.files[0]);

});

function search(locustag) {

    presente = false;

    for (var key in data) {

        if (key === locustag) {
            presente = true;
            break;
        } else {
            presente = false;
        }
    }
    return presente;
}

document.getElementById("lista").addEventListener('change', function () {

    var saida = "";
    var filereader = new FileReader();
    var count = 0;

    filereader.onload = function () {
        var linhas = this.result.split("\n");

        for (let index = 0; index < linhas.length; index++) {
            var linha = linhas[index].replace(/\r/g, '').replace(/^>/, '');

            if (search(linha)) {
                saida += ">" + linha + "\n" + data[linha];
                count++;
            }
        }
        if (count > 0) {
            document.getElementById("fasta_texto").textContent = saida;
            progressBar();

        } else {
            document.getElementById("fasta_texto").textContent = "";
            alert("Nenhuma locustag encontrada!");
        }
        data = {};
    }
    filereader.readAsText(this.files[0]);
});

function progressBar() {

    var elem = document.getElementById("myBar");
    elem.hidden = false;
    var width = 0;
    var id = setInterval(frame, 5);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            elem.hidden = true;
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}