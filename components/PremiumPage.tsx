import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Crown, Music, Download, SkipForward, Volume, Headphones } from "lucide-react";

export function PremiumPage() {
  const features = [
    {
      icon: Music,
      title: "Ad-free music",
      description: "Enjoy uninterrupted music without ads"
    },
    {
      icon: Download,
      title: "Download music",
      description: "Listen offline with downloads"
    },
    {
      icon: SkipForward,
      title: "Unlimited skips",
      description: "Skip songs as many times as you want"
    },
    {
      icon: Volume,
      title: "High quality audio",
      description: "Stream in premium 320kbps quality"
    },
    {
      icon: Headphones,
      title: "Background play",
      description: "Keep music playing when using other apps"
    }
  ];

  const plans = [
    {
      name: "Individual",
      price: "$9.99",
      period: "month",
      description: "1 account",
      popular: false,
      features: ["Ad-free music", "Download music", "Background play"]
    },
    {
      name: "Family",
      price: "$14.99", 
      period: "month",
      description: "Up to 6 accounts",
      popular: true,
      features: ["Everything in Individual", "6 premium accounts", "Family mix playlist"]
    },
    {
      name: "Student",
      price: "$4.99",
      period: "month", 
      description: "1 account",
      popular: false,
      features: ["Ad-free music", "Download music", "Student discount"]
    }
  ];

  return (
    <div className="pb-20">
      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="mb-4">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">YouTube Music Premium</h1>
            <p className="text-muted-foreground">
              Enjoy millions of songs without ads, offline downloads, and background play
            </p>
          </div>
          
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
            Try Premium Free for 1 Month
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Cancel anytime. Terms and conditions apply.
          </p>
        </div>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Premium Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <feature.icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div>
          <h2 className="text-lg font-bold mb-4">Choose Your Plan</h2>
          <div className="space-y-4">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-red-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{plan.price}</p>
                      <p className="text-sm text-muted-foreground">/{plan.period}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Get Premium" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12">
                <span className="font-bold text-blue-600">PayPal</span>
              </Button>
              <Button variant="outline" className="h-12">
                <span className="font-bold">Credit Card</span>
              </Button>
              <Button variant="outline" className="h-12">
                <span className="font-bold text-green-600">Google Pay</span>
              </Button>
              <Button variant="outline" className="h-12">
                <span className="font-bold">Apple Pay</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Free Trial Available
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Get 1 month of YouTube Music Premium for free
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}