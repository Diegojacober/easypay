import React from "react";
import { Div, Text } from "react-native-magnus";
import { FlatList } from "react-native";
import { Emprestimo } from "../../queries/emprestimos/types";
import EmprestimoCard from "../EmprestimoCard";

interface IEmprestimosSectionProps {
    emprestimos: Emprestimo[];
}

function EmprestimoSection({ emprestimos }: IEmprestimosSectionProps) {

    return (
        <Div mt={25} h={250}>
            <Text color="white" fontSize={16} fontWeight="700" mb={4}>
                Loans
            </Text>

            {emprestimos?.length > 0 ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.data_pedido}
                    data={emprestimos}
                    renderItem={({ item }) => (
                        <EmprestimoCard
                            key={item.data_pedido}
                            emprestimo={item}
                        />
                    )}
                />
            ) : (
                <Text color="gray500" fontSize={12} ml={15} mt={5}>
                    Nenhum Emprestimo...
                </Text>
            )}
        </Div>
    );
}

export default EmprestimoSection;
