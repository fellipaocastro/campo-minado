"use strict";

$( document ).ready( function() {
    var TOTAL_LINHAS = 5;
    var TOTAL_COLUNAS = 5;
    var TOTAL_BOMBAS = 5;
    var BOMBA = 'B-O-M-B-A!';

    var campo = [];
    var bombas = [];
    var totalFalhas = 0;

    var validaConfiguracoes = function() {
        if ( TOTAL_LINHAS < 1 ) {
            alert( 'É necessário setar ao menos uma linha para criar o jogo!' );
            totalFalhas++;
        }

        if ( TOTAL_COLUNAS < 1 ) {
            alert( 'É necessário setar ao menos uma coluna para criar o jogo!' );
            totalFalhas++;
        }

        if ( TOTAL_BOMBAS < 1 ) {
            alert( 'É necessário setar ao menos uma bomba para criar o jogo!' );
            totalFalhas++;
        }

        if ( TOTAL_BOMBAS > ( TOTAL_LINHAS * TOTAL_COLUNAS ) ) {
            alert( 'O número de bombas não pode ser maior que a relação linhas x colunas!' );
            totalFalhas++;
        }
    }

    var main = function() {
        validaConfiguracoes();

        if ( totalFalhas == 0 ) {
            $( '#campo' ).html( constroiCampo() );

            $( '.row > a' ).on( 'click', function( e ) {
                var linha = $( this ).parent().attr( 'id' );
                linha = linha.split( '-' );
                linha = linha[ 1 ];

                var coluna =  $( this ).children().attr( 'id' );
                coluna = coluna.split( '-' );
                coluna = coluna[ 3 ];

                escolheQuadrado( linha, coluna );

                e.preventDefault();
            });

            for ( var i = 1; i <= TOTAL_BOMBAS; i++ ) {
                escondeBomba();
            }
        }
    }

    var constroiCampo = function() {
        var html = '';
        
        for ( var i = 1; i <= TOTAL_LINHAS; i++ ) {
            html += '<div class="row" id="linha-' + i +'">';

            campo[ i ] = [];

            for ( var j = 1; j <= TOTAL_COLUNAS; j++ ) {
                campo[ i ][ j ] = '';
                
                html += '<a href="#"><div class="col-md-1" id="linha-' + i + '-coluna-' + j + '">&nbsp;</div></a>';
            }

            html += '</div>';
        }

        return html;
    }

    var retornaRandomico = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    var checaBomba = function( linha, coluna ) {
        if ( campo[ linha ][ coluna ] == BOMBA ) {
            return true;
        }
    }

    var escondeBomba = function() {
        var linha = retornaRandomico( 1, TOTAL_LINHAS );
        var coluna = retornaRandomico( 1, TOTAL_COLUNAS );

        if ( ! checaBomba( linha, coluna ) ) {
            campo[ linha ][ coluna ] = BOMBA;

            bombas.push( linha + 'x' + coluna );

            // $( '#linha-' + linha + '-coluna-' + coluna ).addClass( 'bomba_selecionada' );
        } else {
            escondeBomba();
        }
    }

    var checaLinhaExiste = function( linha ) {
        if ( ( linha > 0 ) && ( linha <= TOTAL_LINHAS ) ){
            return true;
        }
    }

    var checaColunaExiste = function( coluna ) {
        if ( (coluna > 0 ) && ( coluna <= TOTAL_COLUNAS ) ){
            return true;
        }
    }

    var retornaAdjacentes = function( linha, coluna ){
        linha = parseInt( linha );
        coluna = parseInt( coluna );

        var adjacentes = [];

        for ( var i = linha - 1; i <= linha + 1; i++ ) {
            if ( checaLinhaExiste( i ) ) {
                for ( var j = coluna - 1; j <= coluna + 1; j++ ) {
                    if ( checaColunaExiste( j ) ) {
                        if ( ! ( ( i == linha ) && ( j == coluna ) ) ){
                            adjacentes.push( i + 'x' + j );
                        }
                    }
                }
            }
        }

        return adjacentes;
    }

    var mostraAdjacentes = function( linha, coluna ) {
        var bombasRedor = 0;
        var adjacentes = retornaAdjacentes( linha, coluna );

        for ( var i = 0; i < adjacentes.length; i++ ){
            adjacente = adjacentes[ i ].split( 'x' );
            var linha_adjacente = adjacente[ 0 ];
            var coluna_adjacente = adjacente[ 1 ];

            if ( checaBomba( linha_adjacente, coluna_adjacente ) ) {
                bombasRedor++;
            }
        }

        $( '#linha-' + linha + '-coluna-' + coluna ).html( bombasRedor );
    }

    var escolheQuadrado = function( linha, coluna ) {
        if ( checaBomba( linha,  coluna ) ) {
            for ( var i = 0; i < bombas.length; i++ ){
                bomba = bombas[ i ].split( 'x' );
                var linha_bomba = bomba[ 0 ];
                var coluna_bomba = bomba[ 1 ];

                $( '#linha-' + linha_bomba + '-coluna-' + coluna_bomba ).addClass( 'bomba' );
            }

            $( '#linha-' + linha + '-coluna-' + coluna ).removeClass( 'bomba' ).addClass( 'bomba_selecionada' );

            alert( BOMBA );
            
            location.reload();
        } else {
            var bombasRedor = 0;
            var adjacentes = retornaAdjacentes( linha, coluna );

            for ( var i = 0; i < adjacentes.length; i++ ){
                adjacente = adjacentes[ i ].split( 'x' );
                var linha_adjacente = adjacente[ 0 ];
                var coluna_adjacente = adjacente[ 1 ];

                if ( checaBomba( linha_adjacente, coluna_adjacente ) ) {
                    bombasRedor++;
                }
            }

            $( '#linha-' + linha + '-coluna-' + coluna ).html( bombasRedor );

            if ( bombasRedor == 0 ) {
                for ( var i = 0; i < adjacentes.length; i++ ){
                    adjacente = adjacentes[ i ].split( 'x' );
                    var linha_adjacente = adjacente[ 0 ];
                    var coluna_adjacente = adjacente[ 1 ];

                    mostraAdjacentes( linha_adjacente, coluna_adjacente );
                }
            }
        }
    }

    main();
});
