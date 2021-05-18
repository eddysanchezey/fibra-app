 public virtual DbQuery<ViewExpedienteAgregado> ViewExpedienteAgregado { get; set; }
        public virtual DbQuery<ViewExpedienteConsultaEstado> ViewExpedienteConsultaEstados { get; set; }
        public virtual DbQuery<ViewReporteExpXContribuyente> ViewReporteExpXContribuyente { get; set; }
        public virtual DbQuery<ViewReporteEXCAgregado> ViewReporteEXCAgregado { get; set; }

         modelBuilder.Query<ViewReporteEXCAgregado>(vista =>
            {
                vista.ToView("VW_REPORTE_EXP_X_CONT_AGREGADO");

                vista.Property(e => e.Periodo)
                    .HasColumnName("periodo")
                    .IsUnicode(false);
                vista.Property(e => e.Tributo)
                    .HasColumnName("tributo")
                    .IsUnicode(false);
                vista.Property(e => e.IdContribuyente)
                    .HasColumnName("id_contribuyente")
                    .IsUnicode(false);
                vista.Property(e => e.IdTributo)
                    .HasColumnName("id_tributo")
                    .IsUnicode(false);

            });
            modelBuilder.Query<ViewReporteExpXContribuyente>(vista =>
            {
                vista.ToView("VW_REPORTE_EXP_X_CONT");

                vista.Property(e => e.NroExpediente)
                    .HasColumnName("nro_expediente")
                    .IsUnicode(false);
                vista.Property(e => e.IdContribuyente)
                    .HasColumnName("id_contribuyente")
                    .IsUnicode(false);
                vista.Property(e => e.IdTipo)
                    .HasColumnName("id_tipo")
                    .IsUnicode(false);
                vista.Property(e => e.Tipo)
                    .HasColumnName("tipo")
                    .IsUnicode(false);
                vista.Property(e => e.Estado)
                    .HasColumnName("estado")
                    .IsUnicode(false);
                vista.Property(e => e.FPresentacion)
                    .HasColumnName("f_presentacion")
                    .HasColumnType("date");
                vista.Property(e => e.Periodo)
                    .HasColumnName("periodo")
                    .IsUnicode(false);
                vista.Property(e => e.Responsable)
                    .HasColumnName("responsable")
                    .IsUnicode(false);
                vista.Property(e => e.Socio)
                    .HasColumnName("socio")
                    .IsUnicode(false);
                vista.Property(e => e.Tributo)
                    .HasColumnName("tributo")
                    .IsUnicode(false);
            });
            modelBuilder.Query<ViewExpedienteConsultaEstado>(vista =>
            {
                vista.ToView("vw_expediente_consulta_estado");

                vista.Property(e => e.PadreNro)
                    .HasColumnName("p_nro")
                    .IsUnicode(false);
                vista.Property(e => e.PadreEstadoId)
                    .HasColumnName("p_estado");
                vista.Property(e => e.ExpedienteEstadoId)
                    .HasColumnName("ex_estado");
                vista.Property(e => e.ExpedienteNro)
                    .HasColumnName("ex_nro")
                    .IsUnicode(false);
                vista.Property(e => e.ExpedientePeriodo)
                    .HasColumnName("ex_periodo")
                    .IsUnicode(false);
                vista.Property(e => e.ExpedienteReparo)
                    .HasColumnName("ex_reparo")
                    .IsUnicode(false);
                vista.Property(e => e.ExpedienteValor)
                    .HasColumnName("ex_valor")
                    .IsUnicode(false);
                vista.Property(e => e.ExpedienteTributoId)
                    .HasColumnName("ex_tributo");
                vista.Property(e => e.HijoEstadoId)
                    .HasColumnName("h_estado");
                vista.Property(e => e.HijoNro)
                    .HasColumnName("h_nro")
                    .IsUnicode(false); ;
                vista.Property(e => e.PadreTipoId)
                    .HasColumnName("p_tipo");
                vista.Property(e => e.HijoTipoId)
                    .HasColumnName("h_tipo");
                vista.Property(e => e.ExpedienteTipoId)
                    .HasColumnName("ex_tipo");
                vista.Property(e => e.ExpedienteId)
                    .HasColumnName("ex_id");
                vista.Property(e => e.PadreId)
                    .HasColumnName("p_id");
                vista.Property(e => e.HijoId)
                    .HasColumnName("h_id");
            });
            modelBuilder.Query<ViewExpedienteAgregado>(entity =>
            {
                entity.ToView("vw_exp_expediente_agregado");

                entity.Property(e => e.CodigoResolucion)
                    .HasColumnName("codigo_resolucion")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Comentario)
                    .HasColumnName("comentario")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FCitacion)
                    .HasColumnName("f_citacion")
                    .HasColumnType("date");

                entity.Property(e => e.FEmision)
                    .HasColumnName("f_emision")
                    .HasColumnType("date");

                entity.Property(e => e.FNotificacion)
                    .HasColumnName("f_notificacion")
                    .HasColumnType("date");

                entity.Property(e => e.FPresentacion)
                    .HasColumnName("f_presentacion")
                    .HasColumnType("date");

                entity.Property(e => e.FlagEmitido)
                    .HasColumnName("flag_emitido")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.IdContribuyente).HasColumnName("id_contribuyente");

                entity.Property(e => e.IdEstado).HasColumnName("id_estado");

                entity.Property(e => e.IdMoneda).HasColumnName("id_moneda");

                entity.Property(e => e.IdResponsable).HasColumnName("id_responsable");

                entity.Property(e => e.IdResultadoResolucion).HasColumnName("id_resultado_resolucion");

                entity.Property(e => e.IdTipo).HasColumnName("id_tipo");

                entity.Property(e => e.IdTipoAsociado).HasColumnName("id_tipo_asociado");

                entity.Property(e => e.IdTributo).HasColumnName("id_tributo");

                entity.Property(e => e.LinkOnespace)
                    .HasColumnName("link_onespace")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MontoSolicitado)
                    .HasColumnName("monto_solicitado")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.NroExpediente)
                    .HasColumnName("nro_expediente")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .IsRequired()
                    .HasColumnName("periodo")
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.SunatCorreo)
                    .HasColumnName("sunat_correo")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SunatResolutor)
                    .HasColumnName("sunat_resolutor")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SunatTelefono)
                    .HasColumnName("sunat_telefono")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TribunalContacto)
                    .HasColumnName("tribunal_contacto")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TribunalRelator)
                    .HasColumnName("tribunal_relator")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TribunalSala)
                    .HasColumnName("tribunal_sala")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
