import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useProduct = (idString: string | string[]) => {
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } =
        await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};