#comentario

#permite vizualizar todos os databases existentes no BD
show databases;

# drop database (nome do batabase); - apaga o database selecionado

#permite criar um novo database no BD
create database db_lion_school;

#permite ativar a utilizacao de um database
use db_lion_school;

#permite vizualizar todas as tabelas existentes dentro de um database
show tables;

create table tbl_aluno (
	id int UNSIGNED not null auto_increment primary key, 
    nome varchar(80) not null,
    foto varchar(100) not null,
    sexo varchar(1),
    rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(18),
    celular varchar(18),
    data_nascimento date not null,
    unique index(id)
    
);

create table tbl_curso(
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(50) not null,
    carga_horaria int not null,
    icone varchar(100) not null,
    sigla varchar(6) not null,
    unique index(id)
);

create table tbl_aluno_curso (
	id int unsigned not null auto_increment primary key,
    id_aluno int unsigned not null,
    id_curso int unsigned not null,
    matricula varchar(15),
    status_aluno varchar(10) not null,
    
    # Programacao para definir uma chave estrangeira
    foreign key (id_aluno) #define qual o atributo sera uma FK (foreign key)
		references tbl_aluno (id), #define de onde vira a PK (primary key)
	foreign key (id_curso) #define qual o atributo sera uma FK (foreign key)
		references tbl_curso (id), #define de onde vira a PK (primary key)
	unique index (id)
);

# Permite vizualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

#Permite inserir dados dentro de uma tabela
insert into tbl_aluno (nome, 
						foto, 
                        sexo, 
                        rg,
                        cpf,
                        email,
                        telefone,
                        celular,
                        data_nascimento)
	values 				('Jose da Silva',
						'https://pt.vecteezy.com/arte-vetorial/567902-icone-de-pessoa',
                        'M',
						'34.456.666-1',
                        '300.576.456-23',
                        'jose@gmail.com',
                        '011 4556-7777',
                        '011 9 9765-6660',
                        '2000-04-10'
                        ); 
                        
insert into tbl_aluno (nome, 
						foto, 
                        sexo, 
                        rg,
                        cpf,
                        email,
                        telefone,
                        celular,
                        data_nascimento)
	values 				('Maria da Silva',
						'https://www.flaticon.com/br/icone-gratis/mulher_180675',
                        'F',
						'31.456.98-1',
                        '760.576.456-09',
                        'maria@gmail.com',
                        '011 4226-7777',
                        '011 9 9345-6660',
                        '1990-07-19'
                        ); 

# Permite alterar um valor de um atributo da tabela
	#Obs: sempre devemos especififcar qual sera o registro que vai sofrer a alteracao
		#geralmente sempre sera a PK
update tbl_aluno set rg= '35.567.23-4' where id = 1;

#Permite apagar um registro de uma tabela no BD
	#Obs: sempre devemos especififcar qual sera o registro que vai sofrer a exclusao
		#geralmente sempre sera a PK
delete from tbl_aluno where id = 1;


