import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Digite o CPF: ");
        String cpf = scanner.nextLine();
        scanner.close();

        cpf = cpf.replaceAll("\\D", "");

        if (isValidCPF(cpf)) {
            System.out.println("O CPF é válido.");
            System.out.println("Estado de emissão: " + getEstadoEmissao(cpf));
        } else {
            System.out.println("O CPF é inválido.");
        }
    }

    public static boolean isValidCPF(String cpf) {
        if (cpf.length() != 11) {
            return false;
        }

        if (cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        try {
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
            }
            int checkDigit1 = 11 - (sum % 11);
            if (checkDigit1 >= 10) {
                checkDigit1 = 0;
            }

            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
            }
            int checkDigit2 = 11 - (sum % 11);
            if (checkDigit2 >= 10) {
                checkDigit2 = 0;
            }

            return checkDigit1 == Character.getNumericValue(cpf.charAt(9)) &&
                    checkDigit2 == Character.getNumericValue(cpf.charAt(10));
        } catch (InputMismatchException e) {
            return false;
        }
    }

    public static String getEstadoEmissao(String cpf) {
        char stateDigit = cpf.charAt(8);
        switch (stateDigit) {
            case '0': return "Rio Grande do Sul";
            case '1': return "Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul ou Tocantins";
            case '2': return "Pará, Amazonas, Acre, Amapá, Rondônia ou Roraima";
            case '3': return "Ceará, Maranhão ou Piauí";
            case '4': return "Pernambuco, Rio Grande do Norte, Paraíba ou Alagoas";
            case '5': return "Bahia ou Sergipe";
            case '6': return "Minas Gerais";
            case '7': return "Rio de Janeiro ou Espírito Santo";
            case '8': return "São Paulo";
            case '9': return "Paraná ou Santa Catarina";
            default: return "Estado desconhecido";
        }
    }
}
