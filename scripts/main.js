'use strict';
var $ = require('jquery');

var itemList = [];
var groupedList = [];
var count = 0;
var mySubTotal = []
var taxRate = .055;
var myTax = 0;
var groupTotal = 0;

$('#submit').on('submit', function(e) {
	e.preventDefault();
	if(isNaN($('#itemCost').val()) || isNaN($('#itemQuant').val()) ) {
		throw 'Must be a Number!'
	}
	itemList.push($('#itemName').val());
	itemList.push(parseFloat($('#itemCost').val()));
	itemList.push(parseFloat($('#itemQuant').val()));
	groupedList.push(itemList);
	itemList = [];
	$('#itemName').val('');
	$('#itemCost').val('');
	$('#itemQuant').val('');
	console.log(groupedList);
	subTotal();
	newItem();
})

$('#total').on('click', function(e) {
	e.preventDefault();
	var totals = tax();
	$('#totalPrint').append('<div>Sub-Total - $'+ totals[0].toFixed(2) + '</div>');
	$('#totalPrint').append('<div>Tax - $'+ totals[1].toFixed(2) + '</div>');
	$('#totalPrint').append('<div>Total - $'+ totals[2] + '</div>');
	console.log(tax());
})

function subTotal() {
	mySubTotal.push(groupedList[count][1] * groupedList[count][2]);
}
function newItem() {
	$('#result').append('<div>' + groupedList[count].join(' - ') + ' - $'+ mySubTotal[count] +'</div>');
	count++;
}
function tax() {
	groupTotal = mySubTotal.reduce(function(a,b) {
		return a + b;
	})
	myTax = (taxRate * groupTotal);
	var total = myTax + groupTotal
	console.log(myTax);
	return [groupTotal, myTax, parseFloat(Math.round(total * 100) / 100).toFixed(2)];
}