((angular) => {

    'use strict';

    var app = angular.module('app', []);

    app.directive('navTabs', [function() {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                /**
                 * Aumenta a área para ativar o scroll automático
                 * @type {number}
                 */
                var offset = +attrs.offset || 0;

                /**
                 * Delay da animação
                 * @type {number}
                 */
                var delay = +attrs.delay || 300;

                /**
                 * Ajusta a aba para caber na tela
                 */
                element.find('li').on('click', function() {

                    // Elemento <li> atual
                    var $this = jQuery(this);

                    // Posição LEFT do <li>
                    var liPositionLeft = $this.offset().left - offset;

                    // Posição RIGHT do <li>. LEFT + WIDTH
                    var liPositionRight = $this.offset().left + $this.outerWidth() + offset;

                    // Posição do primeiro elemento <li>. Usado para ver a diferença de distância com o <li> atual caso tenha dado scroll
                    var liInitialLeft = element.find('li:first-child').offset().left;

                    // Posição LEFT do elemento pai do <li>
                    var containerPositionLeft  = element.offset().left;

                    // Posição RIGHT do elemento pai do <li>
                    var containerPositionRight = containerPositionLeft + element.outerWidth();

                    // Faz o scroll automático se o <li> ultrapassar o tamanho do container tanto na esquerda quanto direita
                    if (liPositionRight > containerPositionRight || liPositionLeft < containerPositionLeft) {
                        element.animate({
                            scrollLeft: liPositionLeft - liInitialLeft
                        }, delay);
                    }

                });

                /**
                 * Estilização do elemento para dar scroll vertical
                 */
                element.css('overflow-x', 'auto')
                       .css('white-space', 'nowrap');
            }
        };
    }]);

})(angular);
