import { memo } from "react";

import { Logo } from "../../../Components/Logo";

// import { Logo } from "@components/Logo";

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const AuthFormContainer = ({ title, subtitle, children, footer }: AuthFormContainerProps) => {
  return (
    <div className="flex">
      <div className="width-container max-w-screen-sm sm:rounded-3xl xs:rounded-none border-white drop-shadow-lg bg-gray-100 px-3 py-6 xs:px-4 sm:m-auto sm:border-1 sm:px-20 sm:py-12 sm:shadow-md">
        <Logo className="mx-auto mb-12 mt-6 flex h-14 items-center justify-center" />
        <div className="mb-14 mt-4 md:text-center">
          <div className="text-xl font-bold sm:text-3xl">{title}</div>
          <div className="mt-1 text-sm font-semibold text-gray-400 sm:mt-3 sm:text-base">{subtitle}</div>
        </div>
        {children}
        <div className="text-center sm:mt-4">
          <div className="mb-2 mt-8 text-center sm:mt-14">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthFormContainer);
