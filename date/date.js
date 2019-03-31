Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

Date.prototype.yyyy = function() {
  return this.getFullYear();
};

Date.prototype.mm = function() {
  var mm = this.getMonth() + 1;

  return (mm>9 ? '' : '0') + mm;
};

Date.prototype.dd = function() {
  var dd = this.getDate() + 1;

  return (dd>9 ? '' : '0') + dd;
};