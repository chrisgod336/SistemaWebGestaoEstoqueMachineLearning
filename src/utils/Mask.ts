export function maskCpfCnpj(valor: string): string {

    const numeros = valor.replace(/\D/g, '');
  
    if (numeros.length <= 11) {
 
      return numeros
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {

      return numeros
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
  }

  export function maskTelefone(valor: string): string {
    const numeros = valor.replace(/\D/g, '');
  
    if (numeros.length <= 10) {

      return numeros
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {

      return numeros
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
  }

  export function maskDinheiro(valor: string | number): string {

    if(valor.toString().length <= 0){
      return ''
    }

    const numero = typeof valor === 'string'
      ? parseFloat(valor.replace(/[^\d]/g, '')) / 100
      : valor;
  
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  export function maskData(valor: string): string {

    if(!valor.length){
      return '';
    }

    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 8);
  
    const partes = [];
    if (apenasNumeros.length >= 2) {
      partes.push(apenasNumeros.slice(0, 2)); 
    }
    if (apenasNumeros.length >= 4) {
      partes.push(apenasNumeros.slice(2, 4)); 
    }
    if (apenasNumeros.length > 4) {
      partes.push(apenasNumeros.slice(4)); 
    }
  
    return partes.join('/');
  }
  
export const unmaskTelefone = (telefone: string): string => {
    return telefone.replace(/\D/g, '');
}

export const unmaskCpfCnpj = (cpfCnpj: string): string => {
  return cpfCnpj.replace(/\D/g, '');
}

export const unmaskValor = (valor: string): number => {
  const numeroLimpo = valor
    .replace(/[R$\s.]/g, '') 
    .replace(',', '.');     

  return parseFloat(numeroLimpo);
}


  
  
  
  