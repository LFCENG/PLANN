'use strict'
define(['app', 'chart'], function (app, Chart) {
    app.register.controller('DashboardController', ['$scope', function ($scope) {
        var ctx = document.getElementById("statusChart");
        var statusChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Returning', 'New'],
                datasets: [{
                    label: "visits",
                    data: [230, 130],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            }
            /*, options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }*/
        });
        console.log('controller loaded');
    }]);
});
