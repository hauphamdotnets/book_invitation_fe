import { yupResolver } from "@hookform/resolvers/yup";
import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

import { loginFormSchema } from "../Schemas/LoginFormSchema";
import { Button } from "../../../Components/Button";
import { Input } from "../../../Components/Form";
import AuthFormContainer from "../Components/AuthFormContainer";
import { AUTH_CODE } from "../../../../App/Constants/codeConstant";
import { AUTH_PATH } from "../../../../App/Constants/routeConstant";
import { Alert } from "../../../Components/Alert";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { AuthFormGeneralError, AuthLoginFormDataType } from "../../../../App/Types/Common";

const Login = () => {
  const { t } = useTranslation("home");
  const [isSubmitting] = useState(false);
  const [generalError] = useState<AuthFormGeneralError | null>(null);
  const {
    control,
    handleSubmit: useFormSubmit,
    watch,
    ...methods
  } = useForm<AuthLoginFormDataType>({
    resolver: yupResolver(loginFormSchema(t)),
  });
  ///
  const email = watch("email");
  const [searchParams] = useSearchParams();
  const handleSubmit = useFormSubmit((formData) => {
    console.log(formData);
    return true;
  });
  ///

  useDocumentTitle(t("login"));

  return (
    <div className="bg-gradient-to-r from-cyan-100 from-20% to-cyan-200 to-90% sm:flex justify-center xs:block xs:h-0 sm:h-screen">
      <AuthFormContainer title={t("titleLogin")} subtitle={t("loginSubtitle")} footer={<div> </div>}>
        <FormProvider control={control} handleSubmit={useFormSubmit} watch={watch} {...methods}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {generalError && (
              <Alert title={t("loginError")} message={generalError.message} type="danger" className="mb-2">
                {generalError.code === AUTH_CODE.ACCOUNT_NOT_EXISTS && (
                  <Link
                    to={`${AUTH_PATH.REGISTER}?email=${encodeURIComponent(
                      email || "",
                    )}&redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
                  >
                    {t("createWithEmail")}
                  </Link>
                )}
              </Alert>
            )}
            <Input
              name="email"
              label={t("email")}
              className="block bg-transparent !border-0 !border-b-2 rounded-none"
              control={control}
              disabled={isSubmitting}
              size="sm"
            />
            <Input
              type="password"
              label={t("password")}
              name="password"
              className="block bg-transparent !border-0 !border-b-2 rounded-none"
              control={control}
              disabled={isSubmitting}
              size="sm"
            />
            <div className="-mb-1.5 -mt-2 flex justify-end">
              <Link
                to={AUTH_PATH.FORGET_PASSWORD}
                className="text-center text-sm font-semibold text-gray-400 hover:underline"
                role="link"
                tabIndex={-1}
              >
                {t("forgetYourPassword")}
              </Link>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="xs:h-12 sm:h-16 lg:h-auto"
            >
              {t("login")}
            </Button>
            <div className="flex">
              <h3>{t("doNotHaveAccount")}</h3>
              <a className="ml-4 text-blue-600/100 hover:underline" href="/#">
                {" "}
                {t("createNow")}{" "}
              </a>
            </div>
          </form>
        </FormProvider>
      </AuthFormContainer>
    </div>
  );
};

export default memo(Login);
