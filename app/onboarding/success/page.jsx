import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AccountCreatedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">
            Profile Created Successfully!
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-center mb-6">
            Thank you for joining FarmConnect. Your Profile has been created and
            is ready to use.
          </p>

          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/browse">Start Browsing Produce</Link>
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Alert variant="default" className="bg-slate-100 border-slate-200">
            <AlertDescription className="text-sm text-center">
              <span className="block mb-1">Need help getting started?</span>
              <Link
                href="/howitworks"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Check out our guide
              </Link>
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountCreatedPage;
