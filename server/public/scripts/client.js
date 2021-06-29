console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    addJoke();
    $('#addJokeButton').on('click', addJoke)


}


// function to add joke through ajax call to server
function addJoke() {
    console.log('made it to add joke');

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: {
                owner: $('#whoseJokeIn').val(),
                ask: $('#questionIn').val(),
                punch: $('#punchlineIn').val(),
        }
    })
    .then( res => {
        console.log('made it to response', res);
        clearInputs();
        retrieveJokes();
    })
    .catch(err => {
        console.log('Did not make it to response', err);
    })

}

// ajax call to get the jokes after POST
function retrieveJokes() {
    console.log('Made it back to client side');

    $.ajax({
        method: 'GET',
        url: '/retrieved'
    })
    .then (res => {
        console.log('joke successfully returned', res);
        showJokes(res);
    })
    .catch (err => {
        console.log('joke did not return', err);
    })
}


// this will clear inputs once joke is submitted
function clearInputs() {
    console.log('made it to clear');
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}


// this will show jokes as they are submitted
function showJokes(res) {
    console.log('getting through to show jokes');
    let el = $('#outputDiv');
    el.empty();
    for (const item of res) {
        $('#outputDiv').append(
            `<p>
                Joke created by ${item.whoseJoke}. Question: ${item.jokeQuestion} Punchline: ${item.punchLine}
            </p>`)
    }
}