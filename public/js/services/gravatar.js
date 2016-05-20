define(['angular'], function () {
    angular.module('Gravatar', []).provider ('$gravatar', function GravatarProvider() {
        var avatarSize = 80;
        var avatarUrl = 'http://www.gravatar.com/avatar/';
        this.setSize = function (size) {
            avatarSize = size;
        }
        this.$get = function () {
            return function (email) {
                return avatarUrl + CryptoJS.MD5(email) + '?size=' + avatarSize.toString();
            }
        };
    });
});

