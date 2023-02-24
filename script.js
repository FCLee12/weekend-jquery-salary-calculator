// Confirming script.js is loaded
console.log( 'script.js is ready' );

$( document ).ready( onReady() );

function onReady() {
    console.log( 'jQuery is ready' );
}