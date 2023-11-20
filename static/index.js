var date = new Date();
var new_date = date.toLocaleDateString('pt-BR');
let display_date = "Data: " + new_date;

$(document).ready(function () {
    $("#display_date").html(display_date);
    $('#save_button').prop('disabled', true);
});

let predicted_emotion;

$(function () {
    $("#predict_button").click(function () {
        let input_data = {
            "text": $("#text").val()
        };
        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                $("#prediction").html("Emoção prevista: " + result.data.predicted_emotion);
                $("#emo_img_url").attr('src', result.data.predicted_emotion_img_url);
                $('#prediction').css("display", "");
                $('#emo_img_url').css("display", "");
                predicted_emotion = result.data.predicted_emotion;
                $('#save_button').prop('disabled', false);
            },
            error: function (jqxhr, textStatus, errorThrown) {
                console.error("AJAX Error:", errorThrown);
                showError("Erro ao prever emoção. Tente novamente.");
            }
        });
    });

    $("#save_button").click(function () {
        save_data = {
            "date": new_date,
            "text": $("#text").val(),
            "emotion": predicted_emotion
        };
        $.ajax({
            type: 'POST',
            url: "/save-entry",
            data: JSON.stringify(save_data),
            dataType: "json",
            contentType: "application/json",
            success: function () {
                alert("Sua entrada foi salva com sucesso!");
                // Remova o recarregamento automático para uma experiência mais suave
                // window.location.reload();
            },
            error: function (jqxhr, textStatus, errorThrown) {
                console.error("AJAX Error:", errorThrown);
                showError("Erro ao salvar entrada. Tente novamente.");
            }
        });
    });

    // Função para exibir mensagens de erro
    function showError(message) {
        $("#error_message").html(message).show();
        $("#prediction").hide();
        $("#emo_img_url").hide();
    }
});
