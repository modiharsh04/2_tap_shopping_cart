angular.module("myApp",[])
		.controller("helloController", function($scope){
				$scope.helloTo = {};
				$scope.helloTo.title = "Harsh";
		})
		.controller('myStoreController', function($scope,$http,$window) {

			$http.get("products.json").then( function(response) {
               $scope.products = response.data.products;
            });

            $scope.cart = [];
			$scope.checkingOut = false;
			$scope.selItem = "assets/pixel.png";

			$scope.total = function(){
				var t = 0;
				$scope.cart.forEach(function(item){
					t += (item.quantity * item.price);
				})
				return t;
			};

			$scope.changeImage = function(product){
				$scope.selItem = product.image;
			};

			$scope.removeItem = function(item){
				$scope.cart.splice(item,1);
				if ($scope.cart.length<=0){
					$scope.checkingOut = false;
				}
			}

			$scope.addToCart = function(product){
				var found = false;
				$scope.cart.forEach(function(item) {
					if (item.id === product.id){
						item.quantity++;
						found = true;
					}
				});
				if (!found){
					$scope.cart.push(angular.extend({quantity: 1}, product));
				}
			};

			$scope.checkOutProcess = function(){
				if ($scope.cart.length>0){
					$scope.checkingOut = !$scope.checkingOut;
				} 
			};

			var frm = this;

			$scope.doBuy = function(){
				if (frm.customerForm.$valid){
					var msg = "Dear " + $scope.custName + ", Thank you for shopping with us.";
					var parent = $scope.$parent;
					parent.checkingOut = false;
					parent.cart.length = 0;
					$window.alert(msg);
					$scope.custName = '';
					$scope.email = '';
					$scope.address = '';
					frm.customerForm.$setPristine();
				}
			};
		});