import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {

  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { error, data: newOrder } = await supabase.from('order_items')
        .insert(items)
        .select()

      if (error) {
        throw new Error(error.message);
      }

      return newOrder;
    },

    onError(error) {
      console.log("error creating order items: ", error);
    }
  });
};