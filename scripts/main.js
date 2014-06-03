$( document ).ready( function() {
    var TOTAL_LINHAS = 5;
    var TOTAL_COLUNAS = 5;
    var TOTAL_BOMBAS = 5;
    var BOMBA = 'B-O-M-B-A!';

    var campo = [];
    var totalFalhas = 0;

    var validaConfiguracoes = function() {
        if( TOTAL_LINHAS < 1 ) {
            alert( 'É necessário setar ao menos uma linha para criar o jogo!' );
            totalFalhas++;
        }

        if( TOTAL_COLUNAS < 1 ) {
            alert( 'É necessário setar ao menos uma coluna para criar o jogo!' );
            totalFalhas++;
        }

        if( TOTAL_BOMBAS < 1 ) {
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
                escolheQuadrado( $( this ) );

                e.preventDefault();
            });

            for( var i = 1; i <= TOTAL_BOMBAS; i++ ) {
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
                
                html += '<a href="#"><div class="col-md-1" id="coluna-' + j + '">&nbsp;</div></a>';
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

            // $( '#linha-' + linha + ' > a > #coluna-' + coluna ).addClass( 'bomba' );
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

    var escolheQuadrado = function( link ) {
        var linha = link.parent().attr( 'id' );
        linha = linha.split( '-' );
        linha = linha[ 1 ];

        var coluna = link.children().attr( 'id' );
        coluna = coluna.split( '-' );
        coluna = coluna[ 1 ];

        if( checaBomba( linha,  coluna ) ) {
            $( '#linha-' + linha + ' > a > #coluna-' + coluna ).addClass( 'bomba' );
            alert( BOMBA );
            location.reload();
        } else {
            var bombasRedor = 0;

            linha = parseInt( linha );
            coluna = parseInt( coluna );

            var adjacentes = retornaAdjacentes( linha, coluna );

            for ( var i = 0; i < adjacentes.length; i++ ){
                adjacentes[ i ] = adjacentes[ i ].split( 'x' );
                var linha_adjacente = adjacentes[ i ][ 0 ];
                var coluna_adjacente = adjacentes[ i ][ 1 ];

                if ( checaBomba( linha_adjacente, coluna_adjacente ) ) {
                    bombasRedor++;
                }
            }

            if ( bombasRedor > 0 ) {
                $( '#linha-' + linha + ' > a > #coluna-' + coluna ).html( bombasRedor );
            }
        }
    }

    main();
});
