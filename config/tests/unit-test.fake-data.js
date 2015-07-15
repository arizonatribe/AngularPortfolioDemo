(function() {
    angular.module('folio.unit-testing.fakeData', ['folio.unit-testing.configFile', 'folio.unit-testing.authToken', 'folio.unit-testing.users'])
        .service('fakeData', ['$window', 'configFile', 'authToken', 'users', FakeData]);

    function FakeData($window, configFile, authToken, users) {
        this.fakeToken = angular.copy(authToken);
        this.fakeConfigJson = angular.copy(configFile);
        this.users = angular.copy(users);
        this.fakeItems = [
            {
                ItemId: '4b6d11ff-c8e8-458c-93a9-b3054c3a7cea',
                Name: 'Item1',
                ItemDateStart: '2015-01-21T13:01:07.9055902-07:00',
                ItemDateEnd: null,
                IsActive: true,
                Description: 'Item Number One',
                SubItem: {
                    SubItemId: 'f5d1dcb8-709b-40e3-a485-d7006203cb12',
                    Name: 'Sub1',
                    Description: 'Lorem ipsum dolor sit amaet',
                    GrandItem: {
                        GrantItemId: '315c4866-a2bb-420c-9215-dc8320d22ae3',
                        Name: '3rd Generation Item'
                    }
                }
            },
            {
                ItemId: '12ce7013-2499-4b22-8a4c-808f5cd0b21f',
                Name: 'Item2',
                ItemDateStart: '2015-01-21T13:01:07.9055902-07:00',
                ItemDateEnd: null,
                IsActive: false,
                Description: 'Item Number Two',
                SubItem: {
                    SubItemId: '96ef22dd-e3c3-4215-bef9-bc731430d492',
                    Name: 'Sub2',
                    Description: 'consectetur adipiscing elit',
                    GrandItem: {
                        GrantItemId: 'b2fd71e3-d4ee-430a-b756-e6c93071b2c5',
                        Name: '3rd Generation Item Two'
                    }
                }
            },
            {
                ItemId: '161aece7-06ec-4035-acff-58df857e37ef',
                Name: 'Item2',
                ItemDateStart: '2015-01-21T13:04:17.9055902-07:00',
                ItemDateEnd: '2015-01-21T13:08:32.9055902-07:00',
                IsActive: true,
                Description: 'Item Number Three',
                SubItem: {
                    SubItemId: 'd2bced7f-775f-4509-a243-755cd1a595ee',
                    Name: 'Sub3',
                    Description: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                    GrandItem: {
                        GrantItemId: 'bdf6fbdf-53e7-4fe5-844a-686082d816eb',
                        Name: '3rd Generation Item Three'
                    }
                }
            }
        ];

        this._ = $window._;
    }

    FakeData.prototype = {
        constructor: FakeData,
        generateTrueOrFalse: function() {
            return Math.floor((Math.random() * 2)) === 1;
        },
        generateDate: function(incrementDays) {
            var hh = Math.floor((Math.random() * 48)) + 1,
              mm = Math.floor((Math.random() * 60)) + 1,
              ss = Math.floor((Math.random() * 60)) + 1,
              ms = Math.floor((Math.random() * 1000)) + 1,
              now = new Date(),
              currentHour = now.getHours();

            now.setHours(currentHour - hh);
            now.setMinutes(mm);
            now.setSeconds(ss);
            now.setMilliseconds(ms);

            if (~~incrementDays > 0) {
                now.setDate(now.getDate() + ~~incrementDays);
            }

            return now;
        },
        getItems: function(name) {
            if (this._.isString(name)) {
                return this[name];
            } else {
                return [];
            }
        },
        generateUUID: function() {
            var d = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },
        generateRandomString: function(length, charSet) {
            var $this = this,
              str = '',
              isAllNumeric = false,
              isNegative = false,
              defaultCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
              parsedLength = parseInt(length, 10),
              parsedIntCharSet;

            if (parsedLength && !$this._.isNaN(parsedLength)) {
                if (!$this._.isString(charSet)) {
                    if ($this._.isNumber(charSet)) {
                        parsedIntCharSet = parseInt(charSet, 10);
                        if (!$this._.isNaN(parsedIntCharSet) && parsedIntCharSet !== 0) {
                            isAllNumeric = true;
                            isNegative = parsedIntCharSet < 0;
                            charSet = '' + Math.abs(parsedIntCharSet) + '';
                        } else {
                            charSet = defaultCharSet;
                        }
                    } else {
                        charSet = defaultCharSet;
                    }
                }

                $this._.range(0, parsedLength).forEach(function() {
                    var newChar = Math.round(Math.random() * (charSet.length - 1));

                    // If we are generating a random number, make sure the first digit is not zero
                    if (isAllNumeric && str.length === 0) {
                        while (newChar === '0') {
                            newChar = Math.round(Math.random() * (charSet.length - 1));
                        }
                    }
                    str += charSet.charAt(newChar);
                });
            }
            return isAllNumeric ? isNegative ? -parseInt(str, 10) : parseInt(str, 10) : str;
        }
    };
})();
