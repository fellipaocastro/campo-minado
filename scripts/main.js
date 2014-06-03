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
                escolherQuadrado( $( this ) );

                e.preventDefault();
            });

            for( var i = 1; i <= TOTAL_BOMBAS; i++ ) {
                esconderBomba();
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

    var retornarRandomico = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    var checaBomba = function( linha, coluna ) {
        if ( campo[ linha ][ coluna ] == BOMBA ) {
            return true;
        }
    }

    var esconderBomba = function() {
        
        var linha = retornarRandomico( 1, TOTAL_LINHAS );
        var coluna = retornarRandomico( 1, TOTAL_COLUNAS );

        if ( ! checaBomba( linha, coluna ) ) {
            campo[ linha ][ coluna ] = BOMBA;

            // $( '#linha-' + linha + ' > a > #coluna-' + coluna ).addClass( 'bomba' );
        } else {
            esconderBomba();
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

    var escolherQuadrado = function( link ) {
        var linha = link.parent().attr( 'id' );
        linha = linha.split( '-' );
        linha = linha[1];

        var coluna = link.children().attr( 'id' );
        coluna = coluna.split( '-' );
        coluna = coluna[1];

        if( checaBomba( linha,  coluna ) ) {
            $( '#linha-' + linha + ' > a > #coluna-' + coluna ).addClass( 'bomba' );
            alert( 'B-O-M-B-A!' );
            location.reload();
        } else {
            var bombasRedor = 0;

            linha = parseInt( linha );
            coluna = parseInt( coluna );

            if ( checaLinhaExiste( linha - 1 ) && checaColunaExiste( coluna - 1 ) ) {
                if ( checaBomba( linha - 1, coluna - 1 ) ) {
                    bombasRedor++;
                }
            }

            if ( checaLinhaExiste( linha - 1 ) ) {
                if ( checaBomba( linha - 1, coluna ) ) {
                    bombasRedor++;
                }
            }

            if ( checaLinhaExiste( linha - 1 ) && checaColunaExiste( coluna + 1 ) ) {
                if ( checaBomba( linha - 1, coluna + 1 ) ) {
                    bombasRedor++;
                }
            }

            if ( checaColunaExiste( coluna - 1 ) ) {
                if ( checaBomba( linha, coluna - 1 ) ) {
                    bombasRedor++;
                }
            }

            if ( checaColunaExiste( coluna + 1 ) ) {
                if ( checaBomba( linha, coluna + 1 ) ) {
                    bombasRedor++;
                }
            }

            if ( checaLinhaExiste( linha + 1 ) && checaColunaExiste( coluna - 1 ) ) {
                if ( checaBomba( linha + 1, coluna - 1 ) ) {
                    bombasRedor++;
                }
            }

            if ( checaLinhaExiste( linha + 1 ) ) {
                if ( checaBomba( linha + 1, coluna ) ) {
                    bombasRedor++;
                }
            }

            if ( checaLinhaExiste( linha + 1 ) && checaColunaExiste( coluna + 1 ) ) {
                if ( checaBomba( linha + 1, coluna + 1 ) ) {
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
