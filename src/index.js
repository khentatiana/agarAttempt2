if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
} else {
    console.log('Production is online');
}

function component() {
    const element = document.createElement('div');

    element.innerHTML = [
        'Hello World!',
        'Production test2!'
    ].join('<br><br>');

    return element;
}

document.body.appendChild(component());
