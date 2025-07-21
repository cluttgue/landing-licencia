
import Head from 'next/head';
import { Box, Container, Heading, Text, Stack, Link } from '@chakra-ui/react';

export default function PoliticaPrivacidad() {
    return (
        <>
            <Head>
                <title>Política de Privacidad - Simulador Licencia Clase B Chile</title>
                <meta name="description" content="Política de privacidad del simulador de licencia clase B Chile" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <Container maxW="4xl" py={10}>
                <Stack spacing={6}>
                    <Heading as="h1" size="xl" color="blue.600">
                        Política de Privacidad
                    </Heading>

                    <Text color="gray.600" fontSize="sm">
                        Última actualización: {new Date().toLocaleDateString('es-CL')}
                    </Text>

                    <Stack spacing={4}>
                        <Box>
                            <Heading as="h2" size="md" mb={3}>
                                1. Información que recopilamos
                            </Heading>
                            <Text>
                                Recopilamos únicamente la información que proporcionas voluntariamente en nuestro formulario de registro:
                            </Text>
                            <Text as="ul" ml={6} mt={2}>
                                <Text as="li">• Nombre completo</Text>
                                <Text as="li">• Dirección de correo electrónico</Text>
                                <Text as="li">• Fecha programada para tu examen</Text>
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={3}>
                                2. Cómo utilizamos tu información
                            </Heading>
                            <Text>
                                Utilizamos tu información exclusivamente para:
                            </Text>
                            <Text as="ul" ml={6} mt={2}>
                                <Text as="li">• Proporcionarte acceso al simulador</Text>
                                <Text as="li">• Enviar recordatorios sobre tu fecha de examen</Text>
                                <Text as="li">• Mejorar nuestros servicios</Text>
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={3}>
                                3. Protección de datos
                            </Heading>
                            <Text>
                                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal
                                contra acceso no autorizado, alteración, divulgación o destrucción.
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={3}>
                                4. Compartir información
                            </Heading>
                            <Text>
                                No vendemos, intercambiamos ni transferimos tu información personal a terceros sin tu consentimiento,
                                excepto cuando sea requerido por ley.
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={3}>
                                5. Tus derechos
                            </Heading>
                            <Text>
                                Tienes derecho a:
                            </Text>
                            <Text as="ul" ml={6} mt={2}>
                                <Text as="li">• Acceder a tu información personal</Text>
                                <Text as="li">• Rectificar datos incorrectos</Text>
                                <Text as="li">• Solicitar la eliminación de tus datos</Text>
                                <Text as="li">• Retirar tu consentimiento</Text>
                            </Text>
                        </Box>

                        <Box>
                            <Heading as="h2" size="md" mb={3}>
                                6. Contacto
                            </Heading>
                            <Text>
                                Para ejercer tus derechos o realizar consultas sobre esta política, contáctanos en:
                                <Link href="mailto:contacto@licenciafacil.cl" color="blue.500" ml={1}>
                                    contacto@licenciafacil.cl
                                </Link>
                            </Text>
                        </Box>
                    </Stack>

                    <Box borderTop="1px" borderColor="gray.200" pt={6} mt={8}>
                        <Link href="/" color="blue.500">
                            ← Volver al simulador
                        </Link>
                    </Box>
                </Stack>
            </Container>
        </>
    );
}
