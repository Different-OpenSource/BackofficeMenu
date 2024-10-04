import toast from "react-hot-toast";

export function loaderToast(
  method: () => Promise<any>,
  options: {
    onSuccess?: () => void;
    loading: string;
    success: string;
    error: string;
  }
): void {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await method();
      if (response.error) {
        reject(response.error);
      }
      if (options.onSuccess) {
        options.onSuccess();
      }
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });

  toast.promise(promise, {
    loading: options.loading,
    success: options.success,
    error: options.error,
  } as any);
}
