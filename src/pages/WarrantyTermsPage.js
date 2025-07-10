import React from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaClock, FaCheckCircle, FaCircle } from 'react-icons/fa';
import Footer from '../components/Footer';

const TermsContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.header`
  width: 100%;
  background: linear-gradient(135deg, #1a4d2e 0%, #22c55e 50%, #16a34a 100%);
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  height: 3rem;
  width: auto;
`;

const Main = styled.main`
  width: 100%;
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const PageSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-left: 4px solid #16a34a;
  margin-bottom: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
  font-size: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const SectionText = styled.p`
  color: #374151;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const HighlightSection = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #bbf7d0;
`;

const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const StepNumber = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: #16a34a;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const StepText = styled.span`
  color: #374151;
  font-size: 1rem;
  line-height: 1.6;
`;

const ConditionsList = styled.div`
  margin: 1.5rem 0;
`;

const ConditionItem = styled.div`
  margin-bottom: 1rem;
`;

const ConditionHeader = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ConditionText = styled.div`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const LegalBox = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  background: #f0fdf4;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  color: #166534;
  line-height: 1.6;
`;

const WarrantyTermsPage = () => {
  return (
    <TermsContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <a href="/">
            <Logo src="/logo-definamax.png" alt="Definamax" />
          </a>
        </HeaderContent>
      </Header>

      <Main>
        <Container>
          {/* Page Header */}
          <PageHeader>
            <PageTitle>Termos de Garantia</PageTitle>
            <PageSubtitle>
              Conheça os detalhes sobre nossa política de garantia e devolução
            </PageSubtitle>
          </PageHeader>

          {/* Compromisso com sua satisfação */}
          <HighlightSection>
            <SectionHeader>
              <SectionIcon>
                <FaFileAlt />
              </SectionIcon>
              <SectionTitle>Compromisso com sua satisfação</SectionTitle>
            </SectionHeader>
            <SectionText>
              Na Definamax, acreditamos que a confiança de nossos clientes é nosso maior patrimônio. Por isso, 
              oferecemos uma política de garantia transparente e justa, que assegura sua total satisfação com 
              nossos produtos. Nosso compromisso vai além do que determina a legislação, pois queremos que 
              você tenha a melhor experiência possível.
            </SectionText>
            <SectionText>
              Abaixo, detalhamos todas as informações sobre nossas garantias, procedimentos de devolução e 
              reembolso. Caso tenha qualquer dúvida após a leitura, nossa equipe de atendimento está à 
              disposição para ajudá-lo através dos nossos canais de contato.
            </SectionText>
          </HighlightSection>

          {/* Garantia de Arrependimento */}
          <Section>
            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <FaClock />
                </SectionIcon>
                <SectionTitle>Garantia de Arrependimento</SectionTitle>
              </SectionHeader>
              <SectionText>
                De acordo com o Código de Defesa do Consumidor (Lei nº 8.078/90), o cliente tem o direito de 
                solicitar o cancelamento da compra em até 7 (sete) dias corridos a partir da data de recebimento do 
                produto. Este direito está previsto no artigo 49 do CDC, que estabelece o direito de arrependimento 
                para compras realizadas fora do estabelecimento comercial, como é o caso de compras online.
              </SectionText>
              <LegalBox>
                <strong>Base Legal:</strong> Art. 49 do CDC - "O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua 
                assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de 
                produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio."
              </LegalBox>
            </SectionCard>
          </Section>

          {/* Garantia de Satisfação */}
          <Section>
            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <FaCheckCircle />
                </SectionIcon>
                <SectionTitle>Garantia de Satisfação</SectionTitle>
              </SectionHeader>
              <SectionText>
                Além da garantia legal, oferecemos uma garantia de satisfação de 30 (trinta) dias após a compra, 
                válida exclusivamente para compras de 1 (um) frasco. Esta garantia representa nosso compromisso 
                com a qualidade do produto e a satisfação dos nossos clientes.
              </SectionText>
              <ContactInfo>
                <strong>Como solicitar a garantia de satisfação:</strong>
                <StepsList>
                  <StepItem>
                    <StepNumber>1</StepNumber>
                    <StepText>Envie um e-mail para sac@bourjun.com.br com o assunto: "Garantia de satisfação"</StepText>
                  </StepItem>
                  <StepItem>
                    <StepNumber>2</StepNumber>
                    <StepText>Anexe a nota fiscal do produto</StepText>
                  </StepItem>
                  <StepItem>
                    <StepNumber>3</StepNumber>
                    <StepText>Informe o motivo da insatisfação (opcional, mas recomendado)</StepText>
                  </StepItem>
                  <StepItem>
                    <StepNumber>4</StepNumber>
                    <StepText>Aguarde o retorno da nossa equipe em até 48 horas úteis</StepText>
                  </StepItem>
                </StepsList>
              </ContactInfo>
              <SectionText>
                <strong>Observação:</strong> A garantia de satisfação é um benefício adicional oferecido pela empresa, não substituindo as 
                garantias legais previstas no Código de Defesa do Consumidor.
              </SectionText>
            </SectionCard>
          </Section>

          {/* Trocas por Defeitos ou Vícios */}
          <Section>
            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <FaCircle />
                </SectionIcon>
                <SectionTitle>Trocas por Defeitos ou Vícios</SectionTitle>
              </SectionHeader>
              <SectionText>
                Trocas por defeitos ou vícios no produto são realizadas sem custo adicional para o cliente, 
                conforme previsto no Código de Defesa do Consumidor. Caso o produto apresente qualquer 
                problema de fabricação, embalagem danificada ou qualquer outro vício que comprometa sua 
                qualidade ou eficácia, o cliente tem direito à substituição do produto.
              </SectionText>
              <ContactInfo>
                <strong>Procedimento para solicitação de troca:</strong>
                <StepsList>
                  <StepItem>
                    <StepNumber>1</StepNumber>
                    <StepText>Entre em contato com nosso SAC pelo e-mail sac@bourjun.com.br com o assunto: 
                    "Solicitação de troca por defeito"</StepText>
                  </StepItem>
                  <StepItem>
                    <StepNumber>2</StepNumber>
                    <StepText>Anexe fotos do produto com o defeito ou vício identificado</StepText>
                  </StepItem>
                  <StepItem>
                    <StepNumber>3</StepNumber>
                    <StepText>Anexe a nota fiscal de compra</StepText>
                  </StepItem>
                  <StepItem>
                    <StepNumber>4</StepNumber>
                    <StepText>Nossa equipe analisará o caso e retornará com as instruções para a troca</StepText>
                  </StepItem>
                </StepsList>
              </ContactInfo>
              <LegalBox>
                <strong>Base Legal:</strong> Art. 18 do CDC - "Os fornecedores de produtos de consumo duráveis ou não duráveis respondem 
                solidariamente pelos vícios de qualidade ou quantidade que os tornem impróprios ou inadequados ao consumo a 
                que se destinam ou lhes diminuam o valor, assim como por aqueles decorrentes da disparidade, com as 
                indicações constantes do recipiente, da embalagem, rotulagem ou mensagem publicitária, respeitadas as 
                variações decorrentes de sua natureza, podendo o consumidor exigir a substituição das partes viciadas."
              </LegalBox>
            </SectionCard>
          </Section>

          {/* Condições Gerais */}
          <Section>
            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <FaCheckCircle />
                </SectionIcon>
                <SectionTitle>Condições Gerais</SectionTitle>
              </SectionHeader>
              <ConditionsList>
                <ConditionItem>
                  <ConditionHeader>1. Prazo para Análise:</ConditionHeader>
                  <ConditionText>
                    Todas as solicitações de garantia, devolução ou troca serão analisadas em 
                    até 5 (cinco) dias úteis após o recebimento da solicitação completa com todos os documentos 
                    necessários.
                  </ConditionText>
                </ConditionItem>

                <ConditionItem>
                  <ConditionHeader>2. Reembolso:</ConditionHeader>
                  <ConditionText>
                    Em caso de devolução aprovada, o reembolso será processado em até 10 (dez) dias 
                    úteis, na mesma forma de pagamento utilizada na compra, conforme previsto no artigo 49, 
                    parágrafo único, do CDC. O reembolso será realizado exclusivamente no CPF correspondente à 
                    compra realizada e o método de reembolso será obrigatoriamente o mesmo utilizado para o 
                    pagamento original (cartão de crédito, boleto, PIX, etc.).
                  </ConditionText>
                </ConditionItem>

                <ConditionItem>
                  <ConditionHeader>3. Estado do Produto:</ConditionHeader>
                  <ConditionText>
                    Para exercer o direito de arrependimento ou a garantia de satisfação, o 
                    produto deve estar em condições adequadas, preferencialmente na embalagem original, com todos 
                    os acessórios e componentes recebidos.
                  </ConditionText>
                </ConditionItem>

                <ConditionItem>
                  <ConditionHeader>4. Frete de Devolução:</ConditionHeader>
                  <ConditionText>
                    Em casos de arrependimento (7 dias) ou garantia de satisfação (30 dias), o 
                    custo do frete de devolução será por conta da empresa. Em casos de troca por defeito, tanto o frete 
                    de devolução quanto o de envio do novo produto serão por conta da empresa.
                  </ConditionText>
                </ConditionItem>

                <ConditionItem>
                  <ConditionHeader>5. Limitações:</ConditionHeader>
                  <ConditionText>
                    A garantia de satisfação de 30 dias é válida apenas para a compra de 1 (um) frasco. 
                    Para compras de kits promocionais (3 ou 6 frascos), aplica-se apenas a garantia legal de 7 dias 
                    prevista no CDC.
                  </ConditionText>
                </ConditionItem>

                <ConditionItem>
                  <ConditionHeader>6. Documentação Necessária:</ConditionHeader>
                  <ConditionText>
                    Para qualquer solicitação de garantia, é imprescindível a 
                    apresentação da nota fiscal de compra. Solicitações sem este documento poderão ser recusadas.
                  </ConditionText>
                </ConditionItem>

                <ConditionItem>
                  <ConditionHeader>7. Casos Omissos:</ConditionHeader>
                  <ConditionText>
                    Situações não previstas nestes termos serão analisadas individualmente pela 
                    equipe jurídica da empresa, sempre em conformidade com a legislação vigente e buscando a 
                    melhor solução para o cliente.
                  </ConditionText>
                </ConditionItem>
              </ConditionsList>
            </SectionCard>
          </Section>

          {/* Disposições Finais */}
          <Section>
            <SectionCard>
              <SectionTitle style={{ marginBottom: '1.5rem' }}>Disposições Finais</SectionTitle>
              <SectionText>
                Os presentes Termos de Garantia estão em conformidade com o Código de Defesa do Consumidor (Lei nº 
                8.078/90) e demais legislações aplicáveis. A empresa se reserva o direito de alterar estes termos a 
                qualquer momento, sendo as alterações aplicáveis apenas para compras realizadas após a data de 
                modificação.
              </SectionText>
              <SectionText>
                Ao realizar uma compra em nosso site, o cliente declara estar ciente e de acordo com todos os termos e 
                condições aqui estabelecidos. Recomendamos a leitura integral deste documento antes de finalizar 
                qualquer compra.
              </SectionText>
              <SectionText>
                Para esclarecimentos adicionais ou dúvidas sobre nossa política de garantia, entre em contato com nosso 
                Serviço de Atendimento ao Cliente através do e-mail sac@bourjun.com.br ou pelo telefone (41) 98454-
                9172, de segunda a sexta-feira, das 9h às 18h.
              </SectionText>
              <SectionText style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Última atualização: 10/07/2025
              </SectionText>
            </SectionCard>
          </Section>
        </Container>
      </Main>
      
      <Footer />
    </TermsContainer>
  );
};

export default WarrantyTermsPage; 